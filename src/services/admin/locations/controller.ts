import { locationModel } from "../../../db/Locations";
import mongoose = require("mongoose");
import { HTTP400Error, HTTP404Error, HTTP403Error } from "../../../utils/httpErrors";
import { ListingUtilities } from "../../../utils/ListingUtilities";
import config from "config";

//  Add Location  //
export const addLocation = async (token: any, req: any) => {
    // const decoded: any = await ListingUtilities.getDecoded(token);
    let bodyData: any = req.body;
    let isExist: any = await locationModel.findOne({ city: bodyData.city, isDeleted: false });
    if (!isExist){
        // bodyData.createdBy = decoded.id;
        // bodyData.updatedBy = decoded.id;
        let result = await locationModel.create(bodyData);
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.LOCATION_ERRORS.LOCATION_EXISTS') });
    }
}

//  Get Location list  //
export const getLocationList = async (token: any, body: any) => {
    // const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = [{ isDeleted: false }];

    if (body.searchFilter && (body.searchFilter != "")) {
        let searchValue = body.searchFilter.trim();
        query.push({ name: new RegExp('.*' + searchValue + '.*', "i") });
    }
    let skip: any = body.skip || 0;
    let limit: any = body.limit || 100;

    let totalRecords = await locationModel.find({ $and: query });
    let locationRes = await locationModel.find({ $and: query }).sort({ name: 'asc' }).skip(parseInt(skip)).limit(parseInt(limit));
    if (locationRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: locationRes, totalRecord: totalRecords.length };
    } else {
        return { responseCode: 200, responseMessage: 'Success', data: locationRes, totalRecord: totalRecords.length };
        // throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

 // Delete Location  //
 export const deleteLocation = async (id: string) => {
       if (mongoose.Types.ObjectId.isValid(id)) {
         let categoryRes: any = await locationModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
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

//  Update Location  //
export const updateLocation = async (token: any, id: string, body: any) => {
     //const decoded: any = await EbookUtilities.getDecoded(token);
     if (mongoose.Types.ObjectId.isValid(id)) {
         let locationRes: any = await locationModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
         if (locationRes) {
             locationRes.city = body.city;
             let result = await locationRes.save();
             return { responseCode: 200, responseMessage: 'Success', data: result, };
         } else {
             throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_NOT_EXIST') });
         }
     }
     else {
         throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
     }
 }

// update Location Status//
export const updateLocationStatus = async (token: any, id: string) => {
    //const decoded: any = await EbookUtilities.getDecoded(token);
    if (mongoose.Types.ObjectId.isValid(id)) {
        let locationRes: any = await locationModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (locationRes) {
            locationRes.status=!locationRes.status   
            let result = await locationRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result, };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
 }

//  Get category by Id  //
// export const getCategoryById = async (token: any, id: string) => {
//     const decoded: any = await EbookUtilities.getDecoded(token);
//     if (mongoose.Types.ObjectId.isValid(id)) {
//         let categoryRes: any = await categoryModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
//         if (categoryRes) {
//             return { responseCode: 200, responseMessage: 'Success', data: categoryRes };
//         } else {
//             throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.CATEGORY_ERRORS.CATEGORY_NOT_EXIST') });
//         }
//     }
//     else {
//         throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
//     }
// }

//  Get Category drop down list  //
// export const getCategoryDropdown = async (token: any, queryData: any) => {
//     const decoded: any = await EbookUtilities.getDecoded(token);
//     let query: any = [{ isDeleted: false }];

//     if (queryData.searchFilter && (queryData.searchFilter != "")) {
//         let searchValue = queryData.searchFilter.trim();
//         query.push({ $or: [{ name: new RegExp('.*' + searchValue + '.*', "i") }] });
//     }

//     let categoryRes = await categoryModel.find({ $and: query }).select('name id hexCode').sort({ name: 'asc' });
//     if (categoryRes.length > 0) {
//         return { responseCode: 200, responseMessage: 'Success', data: categoryRes };
//     } else {
//         throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
//     }
// }

