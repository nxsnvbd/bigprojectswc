import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.page.html',
  styleUrls: ['./announcement-create.page.scss'],
})
export class AnnouncementCreatePage implements OnInit {

  title: string = '';
  details: string = '';
  photo: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.showToast('Please upload a valid image (JPG, JPEG, PNG, or WEBP)');
      return;
    }

    this.photo = file;
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(file);
  }
}

  async addAnnouncement() {
    if (!this.title || !this.details) {
      this.showToast('Please fill in all required fields');
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Uploading...',
    });
    await loader.present();

    try {
      const announcementID = this.firestore.createId();
      let photoUrl = null;

      if (this.photo) {
        console.log('Starting upload...', this.photo);
        
        // Compress image
        loader.message = 'Compressing image...';
        const compressedFile = await this.compressImage(this.photo);
        console.log('Compressed file size:', compressedFile.size);
        
        const filePath = `announcements/${announcementID}_${Date.now()}_${compressedFile.name}`;
        console.log('Upload path:', filePath);
        
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, compressedFile);

        // Subscribe to progress updates
        uploadTask.percentageChanges().subscribe((progress) => {
          if (progress) {
            loader.message = `Uploading... ${Math.round(progress)}%`;
            console.log('Upload progress:', progress);
          }
        });

        // Wait for upload to complete
        loader.message = 'Finalizing upload...';
        await lastValueFrom(uploadTask.snapshotChanges());
        console.log('Upload complete, getting URL...');
        
        // Get download URL
        photoUrl = await lastValueFrom(fileRef.getDownloadURL());
        console.log('Photo uploaded:', photoUrl);
      }

      // Save to Firestore
      await this.firestore.collection('announcement').doc(announcementID).set({
        announcementID,
        title: this.title,
        details: this.details,
        photo: photoUrl,
        createdAt: new Date(),
      });

      await loader.dismiss();
      this.showToast('Announcement created successfully');
      this.navCtrl.back();
    } catch (err: any) {
      await loader.dismiss();
      console.error('Error:', err);
      this.showToast(err.message || 'Error saving announcement');
    }
  }

  private async compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, { 
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Image compression failed'));
              }
            },
            'image/jpeg',
            0.7
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  private showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
