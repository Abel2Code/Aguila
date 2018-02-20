import { FormControl } from '@angular/forms';
 
export class PictureValidator {
    onFileChange($event) {
        const file = $event.target.files[0]; // <--- File Object for future use.
        this.form.controls['imageInput'].setValue(file ? file.name : ''); // <-- Set Value for Validation
   }
   fileName = '';
}