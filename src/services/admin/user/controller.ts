import { userModel } from "../../../db/User";
import mongoose = require("mongoose");
import { HTTP400Error, HTTP404Error, HTTP403Error } from "../../../utils/httpErrors";
import { ListingUtilities } from "../../../utils/ListingUtilities";
import config from "config";
import { FileUploadUtilities } from '../../../utils/FileUploadUtilities';

/**
 * Create User
 * @param body 
 */
export const addUser = async (token: any, req: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);

    let bodyData: any;
    if (req.files) {
        //bodyData = JSON.parse(JSON.stringify(req.body));
        bodyData = req.body;
    } else {
        bodyData = req.body;
    }

    if (bodyData.role == 'Admin') {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.USER_ERRORS.INVALID_DESIGNATION') });
    }

    let isExist: any = await userModel.findOne({ email: bodyData.email, isDeleted: false });
    if (!isExist) {
        //body.password = await ListingUtilities.cryptPassword(body.password);
        if (req.files) {
            let fileurl = await FileUploadUtilities.uploadFileToAzure(req.files[0], decoded.id, bodyData);
            bodyData.profilePicture = fileurl;
        }

        let teamIdArr = JSON.parse(bodyData.teams);
        bodyData.teams = teamIdArr;
        bodyData.createdBy = decoded.id;
        bodyData.updatedBy = decoded.id;
        let result = await userModel.create(bodyData);

        if (teamIdArr && (teamIdArr.length > 0)) {
            bodyData.teams.forEach(async (element: any) => {
                // let teamData = await audioBookModel.findOne({ _id: mongoose.Types.ObjectId(element), isDeleted: false });
                // let newTeamMemberId = result._id.toString()
                // teamData.teamMembers.push(newTeamMemberId)
                // teamData.save()
            })
        }
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP400Error({ responseCode: 400, responseMessage: config.get('ERRORS.USER_ERRORS.USER_EXISTS') });
    }
}

/**
 * Get User list
 * @param body 
 */
export const getUserList = async (token: any, body: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = { $and: [{ role: { $ne: "Admin" } }, { createdBy: decoded.id }, { isDeleted: false }] };

    let totalRecords = await userModel.find(query);
    let userRes = await userModel.find(query).sort({ createdAt: -1 }).skip(parseInt(body.skip)).limit(parseInt(body.limit));
    if (userRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: userRes, totalRecord: totalRecords.length };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

/**
 * Get User detail by User id
 * @param body 
 */
export const getUserDetail = async (id: string) => {
    let userRes = await userModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
    if (userRes) {
        return { responseCode: 200, responseMessage: 'Success', data: userRes };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

/**
 * Delete User
 * @param body 
 */
export const deleteUser = async (id: string) => {
    let userRes: any = await userModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
    if (userRes) {

        if (userRes.teams && (userRes.teams.length > 0)) {
            //  update user array in team data  //
            for (let element of userRes.teams) {
                // let teamData = await audioBookModel.findOne({ _id: mongoose.Types.ObjectId(element), isDeleted: false });
                // if (teamData.teamMembers.includes(id)) {
                //     let updatedMembers = teamData.teamMembers.filter((val: any) =>{return (val != id)});                    
                //     teamData.teamMembers = updatedMembers
                //     teamData.save();
                // }
            }
        }
        userRes.isDeleted = true;
        userRes.teams = [];
        let result = await userRes.save();

        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.UNKNOWN_ERROR') });
    }
}


/**
 * Delete User
 * @param body 
 */
export const blockUser = async (id: string, body: any) => {
    let userRes: any = await userModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
    if (userRes) {
        userRes.isBlocked = body.userStatus;
        let result = await userRes.save();
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.UNKNOWN_ERROR') });
    }
}

/**
 * Update User details
 * @param body 
 */
export const updateUser = async (body: any, id: string) => {
    let UserRes: any = await userModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
    if (UserRes) {
        UserRes.firstName = body.firstName || UserRes.firstName;
        UserRes.lastName = body.lastName || UserRes.lastName;
        UserRes.email = body.email || UserRes.email;
        UserRes.address = body.address || UserRes.address;
        UserRes.alternateAddress = body.alternateAddress || UserRes.alternateAddress;
        UserRes.phone = body.phone || UserRes.phone;
        UserRes.alternatePhone = body.alternatePhone || UserRes.alternatePhone;
        UserRes.dob = body.dob || UserRes.dob;
        UserRes.gender = body.gender || UserRes.gender;
        UserRes.role = body.role || UserRes.role;
        UserRes.company = body.company || UserRes.company;

        if (body.teams && (body.teams.length > 0)) {
            let teamIdArr = JSON.parse(body.teams);

            teamIdArr = teamIdArr.filter((val: any) => val !== null);

            //  update member array in team data  //
            teamIdArr.forEach(async (element: any) => {
                // let teamData = await audioBookModel.findOne({ _id: mongoose.Types.ObjectId(element), isDeleted: false });
                // if (!teamData.teamMembers.includes(id)) {
                //     teamData.teamMembers.push(id)
                //     teamData.save();
                // }
            });
            UserRes.teams = teamIdArr;

        }
        else {
            UserRes.teams = UserRes.teams;
        }


        let result = await UserRes.save();
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

/**
 * Get User drop down list 
 */
export const getUserDropdown = async (token: any, queryData: any) => {
    const decoded: any = await ListingUtilities.getDecoded(token);
    let query: any = [{ createdBy: decoded.id }, { isDeleted: false }];

    if (queryData.searchFilter && (queryData.searchFilter != "")) {
        let searchValue = queryData.searchFilter.trim();
        query.push({ $or: [{ firstName: new RegExp('.*' + searchValue + '.*', "i") }, { lastName: new RegExp('.*' + searchValue + '.*', "i") }, { email: new RegExp('.*' + searchValue + '.*', "i") }] });
    }

    let userRes = await userModel.find({ $and: query }).select('firstName lastName id email').sort({ createdAt: -1 });
    if (userRes.length > 0) {
        return { responseCode: 200, responseMessage: 'Success', data: userRes };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}

/**
 * Update User status
 * @param body 
 */
export const updateStatus = async (body: any, id: string) => {
    let UserRes: any = await userModel.findOne({ _id: mongoose.Types.ObjectId(id), isDeleted: false });
    if (UserRes) {
        UserRes.status = body.status;
        let result = await UserRes.save();
        return { responseCode: 200, responseMessage: 'Success', data: result };
    } else {
        throw new HTTP404Error({ responseCode: 404, responseMessage: config.get('ERRORS.NO_RECORD_FOUND') });
    }
}
