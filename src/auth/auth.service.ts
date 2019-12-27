import { Injectable } from "@nestjs/common";
//import { UserRepository, User } from "../user";
//import { InjectRepository } from "@nestjs/typeorm";

export enum AuthProvider {
	GOOGLE = "google"
}

@Injectable()
export default class AuthService {
	//private readonly userRepository: UserRepository;

	/*public constructor(@InjectRepository(User) userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
    */

	public async validateUser(token: string): Promise<{} /*User*/ | undefined> {
		//const user = await this.userRepository.findOneByToken(token);
		//if (user === undefined) {
		//	console.log("create account????");
		//}

        //return user;
        return {};
	}
}