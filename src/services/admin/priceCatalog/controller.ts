import { priceCatalogModel } from "../../../db/PriceCatalog";
import mongoose = require("mongoose");
import { HTTP400Error, HTTP404Error, HTTP403Error } from "../../../utils/httpErrors";
import { ListingUtilities } from "../../../utils/ListingUtilities";
import config from "config";
import { categoryModel } from "../../../db/Categories";

//  Add Category  //
export const addPriceCatalog = async (token: any, req: any) => {
    // const decoded: any = await ListingUtilities.getDecoded(token);
    let bodyData: any = req.body;
    let isExist: any = await priceCatalogModel.findOne({ serviceName: bodyData.serviceName, isDeleted: false });
    if (!isExist) {
        // bodyData.createdBy = decoded.id;
        // bodyData.updatedBy = decoded.id;
        let result = await priceCatalogModel.create(bodyData);
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.PRICE_CATALOG_ERRORS.PRICE_CATALOG_EXISTS') });
    }
}

//  Get Category list  //
export const getPriceCatalogList = async (token: any, body: any) => {
    // const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = [{ isDeleted: false }];

    if (body.searchFilter && (body.searchFilter != "")) {
        let searchValue = body.searchFilter.trim();
        query.push({ name: new RegExp('.*' + searchValue + '.*', "i") });
    }
    let skip: any = body.skip || 0;
    let limit: any = body.limit || 10;

    let totalRecords = await priceCatalogModel.find({ $and: query });
    let priceCatalogRes = await priceCatalogModel.find({ $and: query }).sort({ name: 'asc' }).skip(parseInt(skip)).limit(parseInt(limit));
    for (let i = 0; i < priceCatalogRes.length; i++) {
        for (let j = 0; j < priceCatalogRes[i].categoryId.length; j++) {
            let result = await categoryModel.find({ _id: mongoose.Types.ObjectId(priceCatalogRes[i].categoryId[j]) });
            priceCatalogRes[i].categoryId[j] = result[0].name
        }
    }
    if (priceCatalogRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: priceCatalogRes, totalRecord: totalRecords.length };
    } else {
        return { responseCode: 200, responseMessage: 'Success', data: priceCatalogRes, totalRecord: totalRecords.length };
        // throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

//  Delete PriceCatalog  //
export const deletePriceCatalog = async (id: string) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        let priceCatalogRes: any = await priceCatalogModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (priceCatalogRes) {
            priceCatalogRes.isDeleted = true;
            priceCatalogRes.status = 0;
            let result = await priceCatalogRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.PRICE_CATALOG_ERRORS.PRICE_CATALOG_NOT_EXIST') });
        }
    }
    else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.INVALID_ID') });
    }
}

//  Update Category  //
export const updatePriceCatalog = async (token: any, id: string, body: any) => {
    // const decoded: any = await EbookUtilities.getDecoded(token);
    if (mongoose.Types.ObjectId.isValid(id)) {
        let priceCatalogRes: any = await priceCatalogModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
        if (priceCatalogRes) {
            priceCatalogRes.serviceName = body.serviceName;
            priceCatalogRes.price = body.price;
            priceCatalogRes.categoryId = body.categoryId;
            // categoryRes.updatedBy = decoded.id;
            let result = await priceCatalogRes.save();
            return { responseCode: 200, responseMessage: 'Success', data: result };
        } else {
            throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.PRICE_CATALOG_ERRORS.PRICE_CATALOG_NOT_EXIST') });
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

