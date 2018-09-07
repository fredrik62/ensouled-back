//this handles updating of players, checking their stats every day

const express = require('express');
const router = express.Router();

const osrs = require("osrs-wrapper");
//get all players from db
const Player = require('../../models/player');
const storePlayerData = require('../../models/storedPlayerData');



  module.exports = {
    storePlayerData: function() {
      Player.find({})
      .then((playerAccount) => {
       let accountUserNames = [];
       
       
       for (let i = 0; i < playerAccount.length; i++) {
      accountUserNames.push(playerAccount[i].username);
      osrs.hiscores.getPlayer(accountUserNames[i])
      .then((playerData) => {
          console.log(playerData);
  
        let data = {
          username: accountUserNames[i],
          mode: playerAccount[i].mode,
          overallRank: playerData.Skills.Overall.rank,
          totalLevel: playerData.Skills.Overall.level,
          totalExperience:  playerData.Skills.Overall.xp,
         

        "Attack": {
            rank: playerData.Skills.Attack.rank,
            xp: playerData.Skills.Attack.xp,
            level: playerData.Skills.Attack.level
        },

        "Defence": {
            rank: playerData.Skills.Defence.rank,
            xp: playerData.Skills.Defence.xp,
            level: playerData.Skills.Defence.level
        },

        "Strength": {
            rank: playerData.Skills.Strength.rank,
            xp: playerData.Skills.Strength.xp,
            level: playerData.Skills.Strength.level
        },

        "Hitpoints": {
            rank: playerData.Skills.Hitpoints.rank,
            xp: playerData.Skills.Hitpoints.xp,
            level: playerData.Skills.Hitpoints.level
        },

        "Ranged": {
            rank: playerData.Skills.Ranged.rank,
            xp: playerData.Skills.Ranged.xp,
            level: playerData.Skills.Ranged.level
        },

        "Prayer": {
            rank: playerData.Skills.Prayer.rank,
            xp: playerData.Skills.Prayer.xp,
            level: playerData.Skills.Prayer.level
        },

        "Magic": {
            rank: playerData.Skills.Magic.rank,
            xp: playerData.Skills.Magic.xp,
            level: playerData.Skills.Magic.level
        },

        "Cooking": {
            rank: playerData.Skills.Cooking.rank,
            xp: playerData.Skills.Cooking.xp,
            level: playerData.Skills.Cooking.level
        },

        "Woodcutting": {
            rank: playerData.Skills.Woodcutting.rank,
            xp: playerData.Skills.Woodcutting.xp,
            level: playerData.Skills.Woodcutting.level
        },

        "Fletching": {
            rank: playerData.Skills.Fletching.rank,
            xp: playerData.Skills.Fletching.xp,
            level: playerData.Skills.Fletching.level
        },

        "Fishing": {
            rank: playerData.Skills.Fishing.rank,
            xp: playerData.Skills.Fishing.xp,
            level: playerData.Skills.Fishing.level
        },

        "Firemaking": {
            rank: playerData.Skills.Firemaking.rank,
            xp: playerData.Skills.Firemaking.xp,
            level: playerData.Skills.Firemaking.level
        },

        "Crafting": {
            rank: playerData.Skills.Crafting.rank,
            xp: playerData.Skills.Crafting.xp,
            level: playerData.Skills.Crafting.level
        },

        "Smithing": {
            rank: playerData.Skills.Smithing.rank,
            xp: playerData.Skills.Smithing.xp,
            level: playerData.Skills.Smithing.level
        },

        "Mining": {
            rank: playerData.Skills.Mining.rank,
            xp: playerData.Skills.Mining.xp,
            level: playerData.Skills.Mining.level
        },

        "Herblore": {
            rank: playerData.Skills.Herblore.rank,
            xp: playerData.Skills.Herblore.xp,
            level: playerData.Skills.Herblore.level
        },

        "Agility": {
            rank: playerData.Skills.Agility.rank,
            xp: playerData.Skills.Agility.xp,
            level: playerData.Skills.Agility.level
        },

        "Thieving": {
            rank: playerData.Skills.Thieving.rank,
            xp: playerData.Skills.Thieving.xp,
            level: playerData.Skills.Thieving.level
        },

        "Slayer": {
            rank: playerData.Skills.Slayer.rank,
            xp: playerData.Skills.Slayer.xp,
            level: playerData.Skills.Slayer.level
        },

        "Farming": {
            rank: playerData.Skills.Farming.rank,
            xp: playerData.Skills.Farming.xp,
            level: playerData.Skills.Farming.level
        },

        "Runecrafting": {
            rank: playerData.Skills.Runecrafting.rank,
            xp: playerData.Skills.Runecrafting.xp,
            level: playerData.Skills.Runecrafting.level
        },

        "Hunter": {
            rank: playerData.Skills.Hunter.rank,
            xp: playerData.Skills.Hunter.xp,
            level: playerData.Skills.Hunter.level
        },

        "Construction": {
            rank: playerData.Skills.Construction.rank,
            xp: playerData.Skills.Construction.xp,
            level: playerData.Skills.Construction.level
        
        }};
        

        const storePlayer = storePlayerData({
          username: data.username,
          overAllRank: data.overallRank,
          totalLevel: data.totalLevel,
          totalExperience: data.totalExperience,
          mode: data.mode,
          Attack: data.Attack,
          Defence: data.Defence,
          Strength: data.Strength,
          Hitpoints: data.Hitpoints,
          Ranged: data.Ranged,
          Magic: data.Magic,
          Cooking: data.Cooking,
          Woodcutting: data.Woodcutting,
          Fletching: data.Fletching,
          Fishing: data.Fishing,
          Firemaking: data.Firemaking,
          Crafting: data.Crafting,
          Smithing: data.Smithing,
          Mining: data.Mining,
          Herblore: data.Herblore,
          Agility: data.Agility,
          Thieving: data.Thieving,
          Slayer: data.Slayer,
          Farming: data.Farming,
          Runecrafting: data.Runecrafting,
          Hunter: data.Hunter,
          Construction: data.Construction
          

      })
      storePlayer.save()
          .then(player => {
            //   console.log(player + " saved to database");
              
          })
        })
        .catch((error) => {
            if (error) {
                if (error.statusCode === 404) {
                  console.log('player cannot be found');
                }
               }
        })
      }

      })
 
        
      }
      }


        
       