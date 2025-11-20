import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-media-create',
  templateUrl: './media-create.page.html',
  styleUrls: ['./media-create.page.scss'],
})
export class MediaCreatePage implements OnInit {
  title: string = '';
  details: string = '';
  photoFiles: File[] = [];
  pdfFiles: File[] = [];
  photoPreviews: string[] = []; // For previewing images

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  // When photo(s) selected
  onPhotoSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (validTypes.includes(file.type)) {
          this.photoFiles.push(file);
          const reader = new FileReader();
          reader.onload = () => this.photoPreviews.push(reader.result as string);
          reader.readAsDataURL(file);
        } else {
          this.showToast('Invalid image type. Please upload JPG, PNG, or WEBP only.');
        }
      }
    }
  }

  // When PDF(s) selected
  onPdfSelected(event: any) {
    this.pdfFiles = Array.from(event.target.files);
  }

  // Remove selected photo before upload
  removePhoto(index: number) {
    this.photoFiles.splice(index, 1);
    this.photoPreviews.splice(index, 1);
  }

  async uploadMedia() {
    if (!this.title || !this.details) {
      this.showToast('Please fill in all required fields');
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Uploading...',
    });
    await loader.present();

    try {
      const id = this.firestore.createId();
      const photoUrls: string[] = [];
      const pdfUrls: string[] = [];

      // Upload photos if any
      for (const photo of this.photoFiles) {
        const photoPath = `media/photos/${id}_${photo.name}`;
        const photoRef = this.storage.ref(photoPath);
        await this.storage.upload(photoPath, photo);
        const url = await photoRef.getDownloadURL().toPromise();
        photoUrls.push(url);
      }

      // Upload PDFs if any
      for (const pdf of this.pdfFiles) {
        const pdfPath = `media/pdfs/${id}_${pdf.name}`;
        const pdfRef = this.storage.ref(pdfPath);
        await this.storage.upload(pdfPath, pdf);
        const url = await pdfRef.getDownloadURL().toPromise();
        pdfUrls.push(url);
      }

      // Save to Firestore
      await this.firestore.collection('media').doc(id).set({
        mediaID: id,
        title: this.title,
        details: this.details,
        photos: photoUrls,
        pdfs: pdfUrls,
        dateUploaded: new Date(),
      });

      this.showToast('Media uploaded successfully');
      this.navCtrl.back();
    } catch (err: any) {
      this.showToast(err.message || 'Error uploading media');
    }

    await loader.dismiss();
  }

  private showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
        position: 'bottom',
      })
      .then((toast) => toast.present());
  }
}
