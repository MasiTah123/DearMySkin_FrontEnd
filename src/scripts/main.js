

const main = () => {
  const choosenImage = document.getElementById('image-chose');
  const imgPreview = document.getElementById('img-preview');
  const loadingIndicator = document.getElementById('loading');

  choosenImage.addEventListener("change", () => {
    const files = choosenImage.files[0];
    console.log(files.name);
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      
      fileReader.addEventListener("load", () => {
        imgPreview.innerHTML = '<img src="' + fileReader.result + '" />';
        loadingIndicator.style.display = 'block';
      });    
    }
  })
}

export default main;
