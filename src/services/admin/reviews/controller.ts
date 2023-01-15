import { HTTP400Error, HTTP404Error } from "../../../utils/httpErrors";
import config from "config";
import { reviewModel } from "../../../db/Reviews";
import mongoose = require("mongoose");
import { ListingUtilities } from "../../../utils/ListingUtilities";

//  Add Category  //
export const addReview = async (token: any, req: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    
    let bodyData: any = req.body;
    let isExist: any = await reviewModel.findOne({ reviewername: bodyData.reviewername, isDeleted: false });
    
    if (!isExist) {
        bodyData.createdBy = decoded.id;
        bodyData.updatedBy = decoded.id;
        let result = await reviewModel.create(bodyData);
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.REVIEW_ERRORS.REVIEW_EXISTS') });
    }
}

//  Get Review list  //
export const getReviewList = async (token: any, body: any) => {
    let query: any = [{ isDeleted: false }];

    if (body.searchFilter && (body.searchFilter != "")) {
        let searchValue = body.searchFilter.trim();
        query.push({ name: new RegExp('.*' + searchValue + '.*', "i") });
    }
    let skip: any = body.skip || 0;
    let limit: any = body.limit || 10;

    let totalRecords = await reviewModel.find({ $and: query });
    let reviewRes = await reviewModel.find({ $and: query }).sort({ name: 'asc' }).skip(parseInt(skip)).limit(parseInt(limit));

    if (reviewRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: reviewRes, totalRecord: totalRecords.length };
    } else {
        return { responseCode: 200, responseMessage: 'Success', data: reviewRes, totalRecord: totalRecords.length };
    }
}

//  Delete Review  //
export const deleteReview = async (id: string) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        let reviewRes: any = await reviewModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (reviewRes) {
            reviewRes.isDeleted = true;
            reviewRes.status = 0;
            let result = await reviewRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.REVIEW_ERRORS.REVIEW_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

//  Update Category  //
export const updateReview = async (token: any, id: string, body: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    if (mongoose.Types.ObjectId.isValid(id)) {
        let reviewRes: any = await reviewModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (reviewRes) {
            reviewRes.reviewername = body.reviewername;
            reviewRes.text = body.text;
            reviewRes.date = body.date;
            reviewRes.profileId = body.profileId;
            reviewRes.star = body.star;
            reviewRes.updatedBy = decoded.id;
            let result = await reviewRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.REVIEW_ERRORS.REVIEW_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

