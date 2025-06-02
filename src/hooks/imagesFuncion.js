import axios from 'axios';

const base_url = 'https://682739736b7628c5290f890c.mockapi.io/ava';

// export const fetchLastImage = async () => {
//   try {
//     const res = await axios.get(base_url);
//     const data = res.data;
//     if (data.length > 0) {
//       return data[data.length - 1].imageAva;
//     }
//     return null;
//   } catch (error) {
//     console.error('Rasmni olishda xato:', error);
//     return null;
//   }
// };

export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      try {
        await axios.post(base_url, { imageAva: base64Image });
        resolve(base64Image);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsDataURL(file);
  });
};
