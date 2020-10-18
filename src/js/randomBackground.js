const IMG_PATH = "./images";
const ARRAY_IMG = ["image_1.jpg", "image_2.jpg", "image_3.jpg", "image_4.jpg"];

export default class RandomBackground {
  constructor({ $target }) {
    const image = new Image();
    const imageIndex = this.getRandomIndex();
    image.src = `${IMG_PATH}/${ARRAY_IMG[imageIndex]}`;
    image.classList.add("bg-image");
    this.$image = image;
    $target.append(image);
  }

  getRandomIndex() {
    return Math.floor(Math.random() * ARRAY_IMG.length);
  }
}
