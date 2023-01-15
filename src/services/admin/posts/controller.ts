import { postsModel } from "../../../db/Posts";
import { HTTP400Error, HTTP404Error } from "../../../utils/httpErrors";
import { ListingUtilities } from "../../../utils/ListingUtilities";
import config from "config";
import mongoose = require("mongoose");

//  Add Category  //
export const addPosts = async (token: any, req: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let bodyData: any = req.body;
    let filesData: any = req.files;
    let isExist: any = await postsModel.findOne({ title: bodyData.title, isDeleted: false });

    
        bodyData.createdBy = decoded.id;
        bodyData.updatedBy = decoded.id;
        bodyData.images = filesData;
        let result = await postsModel.create(bodyData);
        return {
            responseCode: 200,
            responseMessage: 'Success',
            data: result
        };
   
    
    // if (!isExist) {
    //     bodyData.createdBy = decoded.id;
    //     bodyData.updatedBy = decoded.id;
    //     bodyData.images = filesData;
    //     let result = await postsModel.create(bodyData);
    //     return {
    //         responseCode: 200,
    //         responseMessage: 'Success',
    //         data: result
    //     };
    // } else {
    //     throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.POST_ERRORS.POST_EXISTS') });
    // }
}

//  Get Category list  //
export const getPostList = async (token: any, body: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = [{ isDeleted: false }];

    if (body.searchFilter && (body.searchFilter != "")) {
        let searchValue = body.searchFilter.trim();
        query.push({ name: new RegExp('.*' + searchValue + '.*', "i") });
    }
    let skip: any = body.skip || 0;
    let limit: any = body.limit || 10;

    let totalRecords = await postsModel.find({ $and: query });
    let postRes = await postsModel.find({ $and: query }).sort({ name: 'asc' }).skip(parseInt(skip)).limit(parseInt(limit));
    if (postRes.length > 0) {
        return {
            responseCode: 200,
            responseMessage: 'Success',
            data: postRes,
            totalRecord: totalRecords.length
        };
    } else {
        return {
            responseCode: 200,
            responseMessage: 'Success',
            data: postRes,
            totalRecord: totalRecords.length
        };
        // throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

//  Delete Category  //


export const deletePost = async (id: string) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
         await postsModel.findByIdAndRemove(id);
         return { responseCode: 200, responseMessage: 'Successfully deleted'}
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}


//  Update Category  //
export const updatePost = async (token: any, id: string, req: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let filesData: any = req.files;
    if (mongoose.Types.ObjectId.isValid(id)) {
        let postRes: any = await postsModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (postRes) {
            postRes.name = req.body.name;
            postRes.serviceName = req.body.serviceName;
            postRes.price = req.body.price;
            postRes.title = req.body.title;
            postRes.tag = req.body.tag;
            postRes.text = req.body.text;
            postRes.categoryId = req.body.categoryId;
            postRes.images = filesData;
            postRes.updatedBy = decoded.id;
            let result = await postRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.POST_ERRORS.POST_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

//  Get category by Id  //
export const getPostById = async (token: any, id: string) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    if (mongoose.Types.ObjectId.isValid(id)) {
        let categoryRes: any = await postsModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (categoryRes) {
            return { responseCode: 200, responseMessage: 'Success', data: categoryRes };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.POST_ERRORS.POST_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

