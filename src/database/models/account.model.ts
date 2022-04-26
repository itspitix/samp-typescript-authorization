import { Connection } from '../main';
import bcrypt from 'bcryptjs';
import { Values } from '../../helpers/constants.enum';
import { SendClientMessage, SetSpawnInfo, SpawnPlayer } from 'samp-node-lib';

export class Account {
    //
    static Check(username: string){
        return new Promise((resolve, reject)=>{
            Connection.query('SELECT `name` FROM `players` WHERE `name` = ?',[username],function(err,res,field){
                if(res.length > 0) { resolve(true); }
                else { resolve(false); } 
            });
        })
    }
    //
    static Login(username: string, password: string){
        return new Promise((resolve, reject)=>{
            Connection.query('SELECT `password` FROM `players` WHERE `name` = ?',[username],function(err,res,field){
                const hashedPass = bcrypt.compareSync(password, res[0].password);
                resolve(hashedPass);
            });
        })   
    }

    //
    static Register(username: string, password: string){
        const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(Values.Rounds));
        return new Promise((resolve, reject)=>{
            Connection.query('INSERT INTO `players` (`name`, `password`) VALUES (?, ?)',[username, hashedPass],function(err,res,field){
                if(res.affectedRows == 1) { resolve(true); }
                else { resolve(false); }
            });
        })       
    }
    //
    static Spawn(player: number){
        SetSpawnInfo(player, 0, Values.Spawn_Skin, Values.Spawn_X,Values.Spawn_Y,Values.Spawn_Z, Values.Spawn_Rot, 0, 0, 0, 0, 0, 0);
        SpawnPlayer(player);
    }
};