import { CommentModel } from "../models/CommentModel";
import { PostModel } from "../models/PostModel";
import { UserModel } from "../models/UserModel";
import { ApplicationModel } from "../models/applicationModel";

export interface ModelsInterface {

    Comment: CommentModel;
    Post: PostModel;
    User: UserModel;
    Application: ApplicationModel;

}