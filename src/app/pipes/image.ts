import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ImageUtils {
    
  async getBase64(event: any, fileName: string, base64String: string | ArrayBuffer) {
    const file = event.target;
    fileName = file.files[0].name;
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onloadend = () => {
      base64String = reader.result
    }
    // Read in the image file as a data URL.
    await reader.readAsDataURL(file.files[0]);
  }

    showDataURLtoFile(fileBase64: string) {
        return `data:image/jpg;base64,${fileBase64}`
    }
}