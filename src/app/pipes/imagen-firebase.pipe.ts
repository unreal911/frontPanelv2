import { Pipe, PipeTransform } from '@angular/core';
import { getDownloadURL, getStorage, ref, Storage } from '@angular/fire/storage';

@Pipe({
  name: 'imagenFirebase'
})
export class ImagenFirebasePipe implements PipeTransform {
  storage = getStorage()
  imgfire = 'https://aeasa.com.mx/wp-content/uploads/2020/02/SIN-IMAGEN.jpg'
  async transform(img: string): Promise<string> {

    await getDownloadURL(ref(this.storage, img)).then(
      (resp) => {
        // console.log(resp)
        this.imgfire = resp
      }
    ).catch(
      (resp) => {
        this.imgfire='https://aeasa.com.mx/wp-content/uploads/2020/02/SIN-IMAGEN.jpg'
        console.log(resp)
      }
    )
    //console.log(this.imgfire)
    return this.imgfire
  }

}
