import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorImage'
})
export class ErrorImagePipe implements PipeTransform {

  /**
   * @param images
   *
   * It receives an array of images for which it will make several verification;
   * Then i use the image from the first position;
   * If the pipe does not receive the images, i use a default image;
   *
   * So i validates images before display them in view
   */
  transform(images: any[]): string {
    if (!images) {
      return './assets/no-image.png';
    }

    if (images.length > 0) {
      return images[0].url;
    } else {
      return './assets/no-image.png';
    }
  }

}
