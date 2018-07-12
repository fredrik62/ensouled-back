const express = require('express');
const router = express.Router();
const osrs = require("osrs-wrapper");
const axios = require('axios');
//db collection
const Player = require('../../models/player');


function PlayerSkill() {
    this.set = function(playerData) {
      // set 'data' to whatever is passed into the function
    
      this.data = {
         

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
      
    };
    this.returnPlayerDetails = function() {
      // return the data
      return this.data;
    };
  }

router.post('/user', (req, res) => {
    
    const gameMode = req.body.ultimate;
    const playerUserName = req.body.rsn;
    const symbols = /^[a-zA-Z0-9_ ]*$/;
    const hasSymbol = symbols.test(playerUserName);

    if (hasSymbol === false || playerUserName.length === 0 || playerUserName.length > 12) {
        return res.status(403).json({code: 'Forbidden, issue with user input'});
    }

    Player.findOne({'username': playerUserName})
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({code: 'username-not-unique'});
       } else if (!userExists){
        console.log("all good");
        let player = osrs.hiscores.getPlayer(playerUserName, gameMode)
      


        .then(player => { 
          PlayerSkill(player);
      
                const me = new PlayerSkill();
                me.set(player);
                const account = me.returnPlayerDetails();
    
    
                var newPlayer = Player({
                    username: playerUserName,
                    overAllRank: account.overallRank,
                    totalLevel: account.totalLevel,
                    totalExperience: account.totalExperience,
                    mode: gameMode,
                    Attack: account.Attack,
                    Defence: account.Defence,
                    Strength: account.Strength,
                    Ranged: account.Ranged,
                    Magic: account.Magic,
                    Cooking: account.Cooking,
                    Woodcutting: account.Woodcutting,
                    Fletching: account.Fletching,
                    Fishing: account.Fishing,
                    Firemaking: account.Firemaking,
                    Crafting: account.Crafting,
                    Smithing: account.Smithing,
                    Mining: account.Mining,
                    Herblore: account.Herblore,
                    Agility: account.Agility,
                    Thieving: account.Thieving,
                    Slayer: account.Slayer,
                    Farming: account.Farming,
                    Runecrafting: account.Runecrafting,
                    Hunter: account.Hunter,
                    Construction: account.Construction
                    
    
                })
                newPlayer.save()
                    .then(player => {
                        console.log(player + " saved to database");
                        res.json("ok");
                    })
                
                })
                .catch((error) => {
                    if (error) {
                       if (error.statusCode === 404) {
                        return res.status(404).json({code: 'player cannot be found'});
                       }
                      }
                  
                })
            }
    
    })
    });
    
    
    
    
    module.exports = router;

              
            