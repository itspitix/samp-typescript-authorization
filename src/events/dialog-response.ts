import { GetPlayerName, Kick, OnDialogResponse } from 'samp-node-lib';
import { Account } from '../database/models/account.model';
import { Dialogs, Values } from '../helpers/constants.enum';

OnDialogResponse(async (player, dialogid, response, listitem, inputtext) => {
    switch(dialogid){
        case Dialogs.Login:{
            if(!response){
                Kick(player.playerid);
                return;
            }

            const Name = await GetPlayerName(player.playerid, Values.Name);
            const Logged = await Account.Login(Name, inputtext);

            if(!Logged){
                Kick(player.playerid);
                return;  
            }

            Account.Spawn(player.playerid);
        }

        case Dialogs.Register:{
            if(!response){
                Kick(player.playerid);
                return;
            }

            const Name = await GetPlayerName(player.playerid, Values.Name);
            const Registered = await Account.Register(Name, inputtext);
            
            if(!Registered){
                Kick(player.playerid);
                return;
            }

            Account.Spawn(player.playerid);
        }
    }
});