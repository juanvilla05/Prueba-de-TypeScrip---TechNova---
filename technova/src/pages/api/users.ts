// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Users from "@/models/Users";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/interfaces/user"; // interfaz global de user
import dbConnection from '@/lib/db';


export type UsersResponse = | {ok :true; data: User[] } | {ok: false ;error: string};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersResponse>,
) {
  try {

     await dbConnection();

    if ( req.method === 'GET'){
        const {id} = req.query;
        if(id){
            const user = await Users.findById(id as string);
            if(!user){
                res.status(404).json({ ok: false , error:'Usuario no encontrado'});
                return;
            }
            res.status(200).json({ ok: true, data: [user]})
        }
        const data = await Users.find();
        res.status(200).json({ok: true , data: data as User[]})
    } else if (req.method === 'POST'){

        const { name, email, password } = req.body
        const newUser = new Users({
            name,
            email,
            password
        })
        const savedUser = await newUser.save();
        res.status(200).json({ok: true, data:[savedUser] as User[]});
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ok: false, error:'Falla en los endpoints de users'})
  }
}