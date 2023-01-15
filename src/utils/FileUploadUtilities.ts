import config from "config";
import fs from 'fs';
import path from "path";
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
// const AccountName = config.get('AZURE_STORAGE.ACCOUNT_NAME');
// const AccountKey = config.get('AZURE_STORAGE.ACCOUNT_KEY');
// const containerName = config.get('AZURE_STORAGE.CONTAINER_NAME');
// const BUCKETURL = `https://${AccountName}.blob.core.windows.net/${containerName}/`;

// const sharedKeyCredential = new StorageSharedKeyCredential(AccountName, AccountKey);
// const blobServiceClient = new BlobServiceClient(
//   `https://${AccountName}.blob.core.windows.net`,
//   sharedKeyCredential
// );
export class FileUploadUtilities {

  /**
   * create container in azure
   * @param name - unique value describing user
   * @returns success
   */
  public static createContainer = async (name: any) => {
    try {
      const containerName = name;
      // const containerClient = blobServiceClient.getContainerClient(containerName);
      // const createContainerResponse = await containerClient.create();
      // console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
      return true;
    } catch (error) {
      console.log("azure error", error);
      return false;
    }
  }

  public static listContainer = async () => {
    let i = 1;
    // let iter = blobServiceClient.listContainers();
    // let containerItem = await iter.next();
    // while (!containerItem.done) {
    //   console.log(`Container ${i++}: ${containerItem.value.name}`);
    //   containerItem = await iter.next();
    // }
  }

  /**
   * Upload file to azure blob container
   * @param data 
   */
  public static uploadFileToAzure = async (file: any, userId: any, body: any) => {
    try {      
      let blobName;
      // const containerClient = blobServiceClient.getContainerClient(`${containerName}`);
      const fileExt = path.extname(file.originalname);
      if(body.type === 'product'){
        blobName = `${userId}/product/${body.id}/${new Date().getTime()}${fileExt}`;
      }else{
        blobName = `${userId}/${new Date().getTime()}${fileExt}`;
      }      
      // const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      // const uploadBlobResponse = await blockBlobClient.uploadFile(file.path, { blobHTTPHeaders: { blobContentType: file.mimetype ? file.mimetype :'image/jpeg' } });
      // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
      fs.unlinkSync(file.path);
      return `${blobName}`;
    }
    catch (error) {
      console.log("azure error", error);
      return '';
    }
  }

  public static listFiles = async (containerName: any) => {
    // const containerClient = blobServiceClient.getContainerClient(containerName);
    let i = 1;
    // let blobs = containerClient.listBlobsFlat();
    // for await (const blob of blobs) {
    //   console.log(`Blob ${i++}: ${blob.name}`);
    // }
  }

  public static deleteFile = async (filename: any) => {
    try {
      // const containerClient = blobServiceClient.getContainerClient(containerName);
      // const blockBlobClient = containerClient.getBlockBlobClient(filename)
      // const blobDeleteResponse = await blockBlobClient.delete();
      return true;
    }
    catch (error) {
      console.log("azure error", error);
      return false;
    }
  }

}