import { categoryModel } from "../../../db/Categories";
import mongoose = require("mongoose");
import { HTTP400Error, HTTP404Error, HTTP403Error } from "../../../utils/httpErrors";
import { ListingUtilities } from "../../../utils/ListingUtilities";
import config from "config";
import { FileUploadUtilities } from '../../../utils/FileUploadUtilities';

//  Add Category  //
export const addCategory = async (token: any, req: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let bodyData: any = req.body;
    let isExist: any = await categoryModel.findOne({ name: bodyData.name, isDeleted: false });
    if (!isExist) {
        bodyData.createdBy = decoded.id;
        bodyData.updatedBy = decoded.id;
        let result = await categoryModel.create(bodyData);
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_EXISTS') });
    }
}

//  Get Category list  //
export const getCategoryList = async (token: any, body: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = [{ isDeleted: false }];

    if (body.searchFilter && (body.searchFilter != "")) {
        let searchValue = body.searchFilter.trim();
        query.push({ name: new RegExp('.*' + searchValue + '.*', "i") });
    }
    let skip: any = body.skip || 0;
    let limit: any = body.limit || 10;

    let totalRecords = await categoryModel.find({ $and: query });
    let categoryRes = await categoryModel.find({ $and: query }).sort({ name: 'asc' }).skip(parseInt(skip)).limit(parseInt(limit));
    if (categoryRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: categoryRes, totalRecord: totalRecords.length };
    } else {
        return { responseCode: 200, responseMessage: 'Success', data: categoryRes, totalRecord: totalRecords.length };
        // throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

//  Delete Category  //
export const deleteCategory = async (id: string) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        let categoryRes: any = await categoryModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (categoryRes) {
            categoryRes.isDeleted = true;
            categoryRes.status = 0;
            let result = await categoryRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

//  Update Category  //
export const updateCategory = async (token: any, id: string, body: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    if (mongoose.Types.ObjectId.isValid(id)) {
        let categoryRes: any = await categoryModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (categoryRes) {
            categoryRes.name = body.name;
            categoryRes.updatedBy = decoded.id;
            let result = await categoryRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

//  Get category by Id  //
export const getCategoryById = async (token: any, id: string) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    if (mongoose.Types.ObjectId.isValid(id)) {
        let categoryRes: any = await categoryModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (categoryRes) {
            return { responseCode: 200, responseMessage: 'Success', data: categoryRes };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

//  Get Category drop down list  //
export const getCategoryDropdown = async (token: any, queryData: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = [{ isDeleted: false }];

    if (queryData.searchFilter && (queryData.searchFilter != "")) {
        let searchValue = queryData.searchFilter.trim();
        query.push({ $or: [{ name: new RegExp('.*' + searchValue + '.*', "i") }] });
    }

    let categoryRes = await categoryModel.find({ $and: query }).select('name id hexCode').sort({ name: 'asc' });
    if (categoryRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: categoryRes };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

