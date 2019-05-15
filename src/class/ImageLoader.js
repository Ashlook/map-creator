export class ImageLoader {
  constructor() { }

  /**
   * Creates a Promise that is resolved with an array of images when all the
   * provided images are loaded, or rejected when any loading fails.
   * @param  {Array<string>} imgSrc Array of image sources
   * @returns {Promise<HTMLImageElement[]>} Promise of images.
   */
  static load(imgSrc) {
    /** @type {Array<Promise>} Array contening all the promise for each image */
    const imgPromises = [];
    imgSrc.map((source) => {
      imgPromises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            return resolve(img);
          };
          img.onerror = () => {
            return reject(new Error('An error occured during loading of image : ' + source));
          };
          img.src = source;
        })
      );
    });
    return Promise.all(imgPromises).then((values) => {
      const results = [];
      imgSrc.map((source) => {

      });
      return values;
    });
  }
}