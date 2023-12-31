import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Image } from '../../interfaces/image.interface';
import { Observable, pipe, map, forkJoin, from, switchMap, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient) {}

  getImagesFromProduct(inputArr: string[]): Observable<Array<Image>> {

      inputArr = inputArr.map(id => `${environment.$_API_URL}/Images/${id}`);
      const fetchObservables = inputArr.map(imageUrl =>
      
        from(fetch(imageUrl)).pipe(
          switchMap(response => from(response.blob())),
          switchMap(blob => {
            const file = new File([blob], 'image.jpg', { type: blob.type });
            return of({ url: imageUrl, file: file });
          })
        )
      );
      return forkJoin(fetchObservables);
    
  }

  deleteImagesFromProduct(inputArr: Array<Image>): Observable<any> | null {
      const deleteRequests = inputArr.map(image => this.httpClient.delete(image.url));
      return forkJoin(deleteRequests);
  }

  /*I'm not entirely sure about this approach below, 
  the point is to close the component and unsubscribe before the response arrives. 
  Like in "background mode", so names will contain 'InBcgMode'.
  Otherwise, you have to wait, despite the fact that posting the ad takes quite a long time*/

  deleteImgsInBcgMode(inputArr: Array<Image>){
    this.deleteImagesFromProduct(inputArr)
    ?.pipe(take(1))
    .subscribe();
  }


  getImageSrc(id:string): string {
    if (!id) return '../../../../assets/img/pictures/noIMGS.png';
    let src = `${environment.$_API_URL}/Images/${id}`;
    return src;
  }
}
