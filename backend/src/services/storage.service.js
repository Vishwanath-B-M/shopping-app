const client = new ImageKit({
    privateKey: process.env['privateKey'], // This is the default and can be omitted
  });
  async function uploadFile(file) {
  const response = await client.files.upload({
    file,
    fileName: 'photo.jpg',
    folder:"cart"
  })
  return response
  };
  
  
  module.exports={uploadFile};