const express = require('express');
const router = express.Router();

const Player = require('../../models/player');
const StoredPlayerData = require('../../models/storedPlayerData');

const MonthlyHighscore = require('../../models/monthlyHighscore');

const moment = require('moment');
const startOfMonth = moment().startOf('month').toISOString();
const endOfMonth = moment().endOf('month').toISOString();




module.exports = {
  calculateXpGains: function() {
    Player.find({})
    .then((playerUsername) => {
      for (let i = 0; i < playerUsername.length; i++) {
        let user = playerUsername[i].username;

        StoredPlayerData.find({ 'username': user, "updated": {$gte: (startOfMonth), $lt: (endOfMonth)}})
        .then((data) => {
          
          if (data.length === 0) {
           console.log("no data on that player yet");
          } else {
          MonthlyHighscore.remove({'username': user})
          .then(() => {
           console.log("user deleted to avoid filling db with same info")
      
            //helpers
            const dFirst = data[0];
            const dLast = data[data.length -1];
  
            // game mode
  
            const gameMode = dFirst.mode;
           
           //overalls
            const totalExperienceFirst = dFirst.totalExperience;
            const totalExperienceLast = dLast.totalExperience;
  
            const overAllRankFirst = dFirst.overAllRank;
            const overAllRankLast = dLast.overAllRank;
  
  
            const totalLevelFirst = dFirst.totalLevel;
            const totalLevelLast = dLast.totalLevel;
  
  
           //skills
  
            const attFirstXp = dFirst.Attack.xp;
            const attLastXp = dLast.Attack.xp;
            const attFirstRank = dFirst.Attack.rank;
            const attLastRank = dLast.Attack.rank;
  
            const defFirstXp = dFirst.Defence.xp;
            const defLastXp = dLast.Defence.xp;
            const defFirstRank = dFirst.Defence.rank;
            const defLastRank = dLast.Defence.rank;
  
            const strFirstXp = dFirst.Strength.xp;
            const strLastXp = dLast.Strength.xp;
            const strFirstRank = dFirst.Strength.rank;
            const strLastRank = dLast.Strength.rank;
  
            const hitpointsFirstXp = dFirst.Hitpoints.xp;
            const hitpointsLastXp = dLast.Hitpoints.xp;
            const hitpointsFirstRank = dFirst.Hitpoints.rank;
            const hitpointsLastRank = dLast.Hitpoints.rank;
  
            const rngFirstXp = dFirst.Ranged.xp;
            const rngLastXp = dLast.Ranged.xp;
            const rngFirstRank = dFirst.Ranged.rank;
            const rngLastRank = dLast.Ranged.rank;

            const prayerFirstXp = dFirst.Prayer.xp;
            const prayerLastXp = dLast.Prayer.xp;
            const prayerFirstRank = dFirst.Prayer.rank;
            const prayerLastRank = dLast.Prayer.rank;
  
            const mageFirstXp = dFirst.Magic.xp;
            const mageLastXp = dLast.Magic.xp;
            const mageFirstRank = dFirst.Magic.rank;
            const mageLastRank = dLast.Magic.rank;
  
            const cookingFirstXp = dFirst.Cooking.xp;
            const cookingLastXp = dLast.Cooking.xp;
            const cookingFirstRank = dFirst.Cooking.rank;
            const cookingLastRank = dLast.Cooking.rank;
  
  
            const woodcuttingFirstXp = dFirst.Woodcutting.xp;
            const woodcuttingLastXp = dLast.Woodcutting.xp;
            const woodcuttingFirstRank = dFirst.Woodcutting.rank;
            const woodcuttingLastRank = dLast.Woodcutting.rank;
  
            const fletchingFirstXp = dFirst.Fletching.xp;
            const fletchingLastXp = dLast.Fletching.xp;
            const fletchingFirstRank = dFirst.Fletching.rank;
            const fletchingLastRank = dLast.Fletching.rank;
           
  
            const fishingFirstXp = dFirst.Fishing.xp;
            const fishingLastXp = dLast.Fishing.xp;
            const fishingFirstRank = dFirst.Fishing.rank;
            const fishingLastRank = dLast.Fishing.rank;
           
            const firemakingFirstXp = dFirst.Firemaking.xp;
            const firemakingLastXp = dLast.Firemaking.xp;
            const firemakingFirstRank = dFirst.Firemaking.rank;
            const firemakingLastRank = dLast.Firemaking.rank;
  
            const craftingFirstXp = dFirst.Crafting.xp;
            const craftingLastXp = dLast.Crafting.xp;
            const craftingFirstRank = dFirst.Crafting.rank;
            const craftingLastRank = dLast.Crafting.rank;
  
            const smithingFirstXp = dFirst.Smithing.xp;
            const smithingLastXp = dLast.Smithing.xp;
            const smithingFirstRank = dFirst.Smithing.rank;
            const smithingLastRank = dLast.Smithing.rank;
  
            const miningFirstXp = dFirst.Mining.xp;
            const miningLastXp = dLast.Mining.xp;
            const miningFirstRank = dFirst.Mining.rank;
            const miningLastRank = dLast.Mining.rank;
  
            const herbloreFirstXp = dFirst.Herblore.xp;
            const herbloreLastXp = dLast.Herblore.xp;
            const herbloreFirstRank = dFirst.Herblore.rank;
            const herbloreLastRank = dLast.Herblore.rank;
  
            const agilityFirstXp = dFirst.Agility.xp;
            const agilityLastXp = dLast.Agility.xp;
            const agilityFirstRank = dFirst.Agility.rank;
            const agilityLastRank = dLast.Agility.rank;
  
            const thievingFirstXp = dFirst.Thieving.xp;
            const thievingLastXp = dLast.Thieving.xp;
            const thievingFirstRank = dFirst.Thieving.rank;
            const thievingLastRank = dLast.Thieving.rank;
  
            const slayerFirstXp = dFirst.Slayer.xp;
            const slayerLastXp = dLast.Slayer.xp;
            const slayerFirstRank = dFirst.Slayer.rank;
            const slayerLastRank = dLast.Slayer.rank;
  
            const farmingFirstXp = dFirst.Farming.xp;
            const farmingLastXp = dLast.Farming.xp;
            const farmingFirstRank = dFirst.Farming.rank;
            const farmingLastRank = dLast.Farming.rank;
  
  
            const runecraftingFirstXp = dFirst.Runecrafting.xp;
            const runecraftingLastXp = dLast.Runecrafting.xp;
            const runecraftingFirstRank = dFirst.Runecrafting.rank;
            const runecraftingLastRank = dLast.Runecrafting.rank;
  
  
            const hunterFirstXp = dFirst.Hunter.xp;
            const hunterLastXp = dLast.Hunter.xp;
            const hunterFirstRank = dFirst.Hunter.rank;
            const hunterLastRank = dLast.Hunter.rank;
  
  
            const constructionFirstXp = dFirst.Construction.xp;
            const constructionLastXp = dLast.Construction.xp;
            const constructionFirstRank = dFirst.Construction.rank;
            const constructionLastRank = dLast.Construction.rank;
  
  
  
            let playerXpGain = {
              username: user,
              mode: gameMode,
              totalExperience: totalExperienceLast - totalExperienceFirst,
              overAllRank: overAllRankFirst - overAllRankLast,
              totalLevel: totalLevelLast - totalLevelFirst,
  
  
              "Skills" : [{
               
                "Attack": {
                  attack: attLastXp - attFirstXp,
                  attackRank: attFirstRank - attLastRank
                },
                "Defence": {
                  defence: defLastXp - defFirstXp,
                  defenceRank: defFirstRank - defLastRank
                },
               "Strength": {
                  strength: strLastXp - strFirstXp,
                  strengthRank: strFirstRank - strLastRank
               },
               "Hitpoints": {
                hitpoints: hitpointsLastXp - hitpointsFirstXp,
                hitpointsRank: hitpointsFirstRank - hitpointsLastRank
               },
               "Ranged": {
                ranged: rngLastXp - rngFirstXp,
                rangedRank: rngFirstRank - rngLastRank
               },
               "Prayer": {
                prayer: prayerLastXp - prayerFirstXp,
                prayerRank: prayerFirstRank - prayerLastRank
               },
               "Magic": {
                magic: mageLastXp - mageFirstXp,
                magicRank: mageFirstRank - mageLastRank
               },
               "Cooking": {
                cooking: cookingLastXp - cookingFirstXp,
                cookingRank: cookingFirstRank - cookingLastRank
               },
               "Woodcutting": {
                woodcutting: woodcuttingLastXp - woodcuttingFirstXp,
                woodcuttingRank: woodcuttingFirstRank - woodcuttingLastRank
               },
               "Fletching": {
                fletching: fletchingLastXp - fletchingFirstXp,
                fletchingRank: fletchingFirstRank - fletchingLastRank
               },
               "Fishing": {
                fishing: fishingLastXp - fishingFirstXp,
                fishingRank: fishingFirstRank - fishingLastRank
               },
               "Firemaking": {
                firemaking: firemakingLastXp - firemakingFirstXp,
                firemakingRank: firemakingFirstRank - firemakingLastRank
               },
               "Crafting": {
                crafting: craftingLastXp - craftingFirstXp,
                craftingRank: craftingFirstRank - craftingLastRank
               },
               "Smithing": {
                smithing: smithingLastXp - smithingFirstXp,
                smithingRank: smithingFirstRank - smithingLastRank
               },
               "Mining": {
                mining: miningLastXp - miningFirstXp,
                miningRank: miningFirstRank - miningLastRank
               },
               "Herblore": {
                herblore: herbloreLastXp - herbloreFirstXp,
                herbloreRank: herbloreFirstRank - herbloreLastRank
               },
               "Agility": {
                agility: agilityLastXp - agilityFirstXp,
                agilityRank: agilityFirstRank - agilityLastRank
               },
               "Thieving": {
                thieving: thievingLastXp - thievingFirstXp,
                thievingRank: thievingFirstRank - thievingLastRank
               },
               "Slayer": {
                slayer: slayerLastXp - slayerFirstXp,
                slayerRank: slayerFirstRank - slayerLastRank
               },
               "Farming": {
                farming: farmingLastXp - farmingFirstXp,
                farmingRank: farmingFirstRank - farmingLastRank
               },
               "Runecrafting": {
                runecrafting: runecraftingLastXp - runecraftingFirstXp,
                runecraftingRank: runecraftingFirstRank - runecraftingLastRank
               },
               "Hunter": {
                hunter: hunterLastXp - hunterFirstXp,
                hunterRank: hunterFirstRank - hunterLastRank
               },
               "Construction": {
                construction: constructionLastXp - constructionFirstXp,
                constructionRank: constructionFirstRank - constructionLastRank
               },
  
              }]};
           

            const monthlyHighscoreData = MonthlyHighscore({
              username: playerXpGain.username,
              mode: playerXpGain.mode,
              totalExperience: playerXpGain.totalExperience,
              totalLevel: playerXpGain.totalLevel,
              overAllRank: playerXpGain.overAllRank,
              Skills: playerXpGain.Skills
             })

            monthlyHighscoreData.save()
              .then(player => {
                  console.log(player + " saved to database");
                 
              })
              .catch((error) => {
                console.log(error);
              })
            })
          }
       
        })
      }
    })

      
    }
    }


      
     