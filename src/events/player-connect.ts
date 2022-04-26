import { DIALOG_STYLE, GetPlayerName, OnPlayerConnect, ShowPlayerDialog } from 'samp-node-lib';
import { Account } from '../database/models/account.model';
import { Dialogs, Values } from '../helpers/constants.enum';


OnPlayerConnect(async (player) => {
    const Name = await GetPlayerName(player.playerid, Values.Name);

    const Response = await Account.Check(Name);
    if(!Response){
        ShowPlayerDialog(player.playerid, Dialogs.Register, DIALOG_STYLE.PASSWORD, 'Register', 'Enter the password', 'Login', 'Close');
        return;
    }
    
    ShowPlayerDialog(player.playerid, Dialogs.Login, DIALOG_STYLE.PASSWORD, 'Login', 'Enter your password', 'Login', 'Close');
});