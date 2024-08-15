import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useItemStore } from '@/stores/inventory';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

export const useCombatStore = defineStore('combatStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    xpMulti: 4,
    findTime: 3.0,
    combatPaused: false,

    activeObject: {},
    activeDungeon: {},
    currentTimeout: 0,
    dungeonRound: [0, 0],
    currentStyle: 'melee',

    currentHealth: 5,
    currentHealthPercent: 100,
    attackProgress: 0,
    attackPercent: 0,
    bestStyle: 'melee',

    eHealth: 0,
    eHealthPercent: 100,
    eAttackProgress: 0,
    eAttackPercent: 0,
    eBestStyle: 'melee',

    dragonHit: -1,
    dragonHitColor: '#dc3644',
    eHit: -1,
    eHitColor: '#dc3644',

    accuracySkillID: 0,
    strengthSkillID: 1,
    markshipSkillID: 2,
    spiritSkillID: 3,

    blockSkillID: 4,
    reflexSkillID: 5,
    acuitySkillID: 6,
    vitalitySkillID: 7,

    explorationSkillID: 9,

    skillStore: useSkillStore(),
    itemStore: useItemStore(),
    smithingStore: useSmithingStore(),
    cookingStore: useCookingStore(),

    enemies: [
      {
        id: 'combatDummy',
        name: 'Combat Dummy',
        location: -1, //any
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'], //melee, ranged, magic
        stats: {
          health: 1,
          speed: 20,

          meleeDamage: 1,
          meleeAccuracy: 0,

          penetration: 0,
          physicalArmor: 0,
          energyArmor: 0,
          resist: 0,

          meleeDodge: 0,
          rangedDodge: 0,
          magicDodge: 0,
        },
        alwaysDrops: [],
        randomDrops: [],
      },
      {
        id: 'wildFox',
        name: 'Wild Fox',
        location: 0, //grove
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 3,
          speed: 2.0,

          meleeDamage: 1,
          meleeAccuracy: 2,

          penetration: 0,
          physicalArmor: 0,
          energyArmor: 0,
          resist: 0,

          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 4,
        },
        alwaysDrops: [
          {
            itemID: 'bones1',
          },
          {
            itemID: 'meatGame',
          },
        ],
        randomDrops: [
          {
            weight: 2
          },
          {
            itemID: 'hide2',
            weight: 1
          },
        ],
      },
      {
        id: 'wildDeer',
        name: 'Fleeting Deer',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 6,
          speed: 2.4,

          meleeDamage: 2,
          meleeAccuracy: 4,

          penetration: 0,
          physicalArmor: 0,
          energyArmor: 0,
          resist: 0,

          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: 5,
        },
        alwaysDrops: [
          {
            itemID: 'bones1',
          },
          {
            itemID: 'meatGame',
            itemRange: [1, 2],
          },
        ],
        randomDrops: [
          {
            weight: 1
          },
          {
            itemID: 'hide2',
            itemRange: [1, 2],
            weight: 1,
          },
        ],
      },
      {
        id: 'koboldExile',
        name: 'Kobold Exile',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 5,
          speed: 2.2,

          meleeDamage: 3,
          meleeAccuracy: 6,

          penetration: 0.05,
          physicalArmor: 0,
          energyArmor: 0,
          resist: 0,

          meleeDodge: 9,
          rangedDodge: 9,
          magicDodge: 2,
        },
        alwaysDrops: [
          {
            itemID: 'bones2',
          },
        ],
        randomDrops: [
          {
            itemID: 'money',
            itemRange: [1, 6],
            weight: 9
          },
          {
            itemID: 'meal1',
            weight: 4
          },
          {
            itemID: 'koboldDagger',
            weight: 1
          },
          {
            itemID: 'koboldChest',
            weight: 1
          },
          {
            itemID: 'koboldMap', //tool that gives exploration experience for combat
            weight: 1
          },
        ],
      },
      {
        id: 'koboldSlinger',
        name: 'Kobold Slinger',
        location: 1, //canton
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 8,
          speed: 2.2,

          rangedDamage: 3,
          rangedAccuracy: 7,

          penetration: 0,
          physicalArmor: 0,
          energyArmor: 0,
          resist: 0.05,

          meleeDodge: 2,
          rangedDodge: 9,
          magicDodge: 9,
        },
        alwaysDrops: [
          {
            itemID: 'bones2',
          },
        ],
        randomDrops: [
          {
            itemID: 'money',
            itemRange: [2, 8],
            weight: 20
          },
          {
            itemID: 'meal2',
            weight: 9
          },
          {
            itemID: 'koboldSling',
            weight: 2
          },
          {
            itemID: 'koboldBracer',
            weight: 1
          },
        ],
      },
      {
        id: 'koboldRanger',
        name: 'Kobold Ranger',
        location: 1, //canton
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 11,
          speed: 2.6,

          rangedDamage: 4,
          rangedAccuracy: 9,

          penetration: 0,
          physicalArmor: 0,
          energyArmor: 0,
          resist: 0.05,

          meleeDodge: 4,
          rangedDodge: 10,
          magicDodge: 10,
        },
        alwaysDrops: [
          {
            itemID: 'bones2',
          },
          {
            itemID: 'copperArrow',
            itemRange: [1, 6],
          },
        ],
        randomDrops: [
          {
            itemID: 'money',
            itemRange: [2, 9],
            weight: 19
          },
          {
            itemID: 'meal2',
            weight: 9
          },
          {
            itemID: 'koboldBracer',
            weight: 3
          },
          {
            itemID: 'koboldBow',
            weight: 1
          },
        ],
      },
    ],
    dungeons: [
      {
        id: '0',
        name: 'Protected Clearing',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        alwaysDrops: [
          {
            itemID: 'antler',
            itemRange: [2, 8],
          },
        ],
        randomDrops: [
          {
            weight: 7,
          },
          {
            itemID: 'crystalAntler',
            weight: 1,
          },
        ],
        rounds: [
          {
            id: 'bossDeer',
            name: 'Herd Deer',
            image: 'src/assets/icons/testIcon16.png',
            amount: 4,
            totalCount: 0,
            styles: ['melee'],
            stats: {
              health: 7,
              speed: 2.4,

              meleeDamage: 2,
              meleeAccuracy: 7,

              penetration: 0,
              physicalArmor: 0,
              energyArmor: 0,
              resist: 0,

              meleeDodge: 6,
              rangedDodge: 6,
              magicDodge: 6,
            },
            alwaysDrops: [
              {
                itemID: 'bones1',
              },
              {
                itemID: 'meatGame',
                itemRange: [1, 3],
              },
            ],
            randomDrops: [
              {
                weight: 1
              },
              {
                itemID: 'hide2',
                itemRange: [1, 2],
                weight: 1,
              },
            ],
          },
          {
            id: 'bossScar',
            name: 'Scar',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['melee'],
            stats: {
              health: 40,
              speed: 2.4,

              meleeDamage: 4,
              meleeAccuracy: 12,

              penetration: 0,
              physicalArmor: 0,
              energyArmor: 0,
              resist: 0.05,

              meleeDodge: 15,
              rangedDodge: 15,
              magicDodge: 15,
            },
            alwaysDrops: [
              {
                itemID: 'bones3',
              },
              {
                itemID: 'meatGame',
                itemRange: [1, 4],
              },
            ],
            randomDrops: [
              {
                weight: 1
              },
              {
                itemID: 'hide2',
                itemRange: [1, 3],
                weight: 1,
              },
            ],
          },
        ],
      },
      {
        id: '1',
        name: 'Guarded Keep',
        location: 1, //canton
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        alwaysDrops: [
          {
            itemID: 'bronzeArrow',
            itemRange: [8, 20],
          },
        ],
        randomDrops: [
          {
            itemID: 'koboldCowl',
            weight: 4,
          },
          {
            itemID: 'koboldJacket',
            weight: 4,
          },
          {
            itemID: 'koboldBracer',
            weight: 1,
          },
          {
            itemID: 'koboldBow',
            weight: 1,
          },
          {
            itemID: 'greenAmmy',
            weight: 1,
          },
          {
            itemID: 'koboldPick',
            weight: 1,
          },
        ],
        rounds: [
          {
            id: 'bossKoboldRanger',
            name: 'Kobold Archer',
            image: 'src/assets/icons/testIcon16.png',
            amount: 4,
            totalCount: 0,
            styles: ['ranged'],
            stats: {
              health: 12,
              speed: 2.6,

              rangedDamage: 4,
              rangedAccuracy: 10,

              penetration: 0,
              physicalArmor: 0,
              energyArmor: 0,
              resist: 0.05,

              meleeDodge: 6,
              rangedDodge: 12,
              magicDodge: 12,
            },
            alwaysDrops: [
              {
                itemID: 'bones2',
              },
            ],
            randomDrops: [
              {
                itemID: 'money',
                itemRange: [2, 10],
                weight: 10
              },
              {
                itemID: 'meal2',
                weight: 6
              },
            ],
          },
          {
            id: 'bossKoboldMelee',
            name: 'Kobold Guard',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['melee'],
            stats: {
              health: 14,
              speed: 2.4,

              meleeDamage: 4,
              meleeAccuracy: 10,

              penetration: 0,
              physicalArmor: 1,
              energyArmor: 0,
              resist: 0.15,

              meleeDodge: 12,
              rangedDodge: 12,
              magicDodge: 0,
            },
            alwaysDrops: [
              {
                itemID: 'bones2',
              },
            ],
            randomDrops: [
              {
                itemID: 'money',
                itemRange: [2, 12],
                weight: 10
              },
              {
                itemID: 'meal2',
                weight: 6
              },
            ],
          },
          {
            id: 'bossDuke',
            name: 'The Duke',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['melee', 'ranged'],
            stats: {
              health: 60,
              speed: 2.8,

              meleeDamage: 5,
              meleeAccuracy: 10,
              rangedDamage: 5,
              rangedAccuracy: 15,

              penetration: 0,
              physicalArmor: 0,
              energyArmor: 0,
              resist: 0.10,

              meleeDodge: 20,
              rangedDodge: 20,
              magicDodge: 20,
            },
            alwaysDrops: [
              {
                itemID: 'bones2',
              },
            ],
            randomDrops: [
              {
                itemID: 'money',
                itemRange: [10, 40],
                weight: 10
              },
              {
                itemID: 'meal3',
                itemRange: [2, 3],
                weight: 6
              },
            ],
          },
        ],
      },
    ],
  }),
  getters: {
  },
  actions: {
    setActiveDungeon(newActiveDungeon) {
    //if you push the button again, do nothing
      if (newActiveDungeon.id == this.activeDungeon.id) {
        return
      }
      clearTimeout(this.currentTimeout)

      this.activeDungeon = newActiveDungeon
      this.dungeonRound = [0, 0]
      this.activeObject = this.activeDungeon.rounds[0]
      this.findEnemy()
    },
    
    setActiveAction(newActiveActivity) {
      //if you push the button again, do nothing
      if (newActiveActivity.id == this.activeObject.id) {
        return
      }
      clearTimeout(this.currentTimeout)

      this.activeObject = newActiveActivity
      this.activeDungeon = {}
      this.findEnemy()
    },

    findEnemy() {
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Fighting: ')

      this.attackProgress = 0
      this.attackPercent = 0
      this.eAttackProgress = 0
      this.eAttackPercent = 0
      this.eHealth = this.activeObject.stats.health
      this.eBestStyle = this.randomStyle(this.activeObject.styles)

      this.currentTimeout = setTimeout(this.combatStep, this.findTime * 1000)
    },
    
    combatStep() {
      //if combat isn't paused, do everything
      if (this.combatPaused == false) {

      if (this.attackProgress >= 1000 * this.itemStore.equippedStats.meleeSpeed) {
        this.attackEnemy()

        //if style is best, then use best, otherwise use forced style
        if (this.currentStyle == 'best') {
          this.bestStyle = this.findBestStyle(this.itemStore.equippedStats, this.activeObject.stats)
        } else {
          this.bestStyle = this.currentStyle
        }

        this.attackProgress = 0
        //on success, stop combat
        if (this.eHealth <= 0) {
          this.eHealth = 0
          this.eHealthPercent = 0
          this.enemyDefeated()
          return
        }
      }

      //enemy attacks
      if (this.eAttackProgress >= 1000 * this.activeObject.stats.speed) {
        //tick eat
        this.checkAutoHealing()
        this.attackDragon()

        this.eBestStyle = this.randomStyle(this.activeObject.styles)
        this.eAttackProgress = 0
        //on failure, stop combat
        if (this.currentHealth <= 0) {
          this.currentHealth = 0
          this.currentHealthPercent = 0
          this.maimed()
          return
        }
        //if survived, check if can heal
        this.checkAutoHealing()
      }

      this.attackProgress += this.progressInterval
      this.eAttackProgress += this.progressInterval

      this.attackPercent = this.attackProgress / (10 * this.itemStore.equippedStats.meleeSpeed)
      this.eAttackPercent = this.eAttackProgress / (10 * this.activeObject.stats.speed)

      this.currentHealthPercent = 100 * this.currentHealth / (this.skillStore.skills[this.vitalitySkillID].level * 5)
      this.eHealthPercent = 100 * this.eHealth / this.activeObject.stats.health
      }

      //repeat combat
      this.currentTimeout = setTimeout(this.combatStep, this.progressInterval)
    },

    attackEnemy() {
      let toDamage = 0
      let toAccuracy = 0
      let toCrit = 1.25

      //calculate damage based on style
      if (this.bestStyle == 'melee') {
        //max hit * (enemy resistance - penetration) - relevant armor
        toDamage = ((1 - Math.max(0, this.activeObject.stats.resist - this.itemStore.equippedStats.meleePen)) * this.itemStore.equippedStats.meleeDamage) - this.activeObject.stats.physicalArmor

        toAccuracy = this.itemStore.equippedStats.meleeAccuracy - this.activeObject.stats.meleeDodge
      }
      if (this.bestStyle == 'ranged') {
        toDamage = ((1 - this.activeObject.stats.resist) * this.itemStore.equippedStats.rangedDamage) - this.activeObject.stats.physicalArmor
        toAccuracy = this.itemStore.equippedStats.rangedAccuracy - this.activeObject.stats.rangedDodge

        //if the weapon has required ammo and the required ammo is equipped
        if (this.itemStore.equippedCombat.rangedSlot.requiredAmmo == this.itemStore.equippedCombat.ammoSlot.ammoType) {
          //remove ammo and unequip if count is 0
          this.itemStore.equippedCombat.ammoSlot.count -= 1
          if (this.itemStore.equippedCombat.ammoSlot.count <= 0) {
            this.itemStore.equipItem(this.itemStore.equippedCombat.ammoSlot)
          }
        }
      }
      if (this.bestStyle == 'magic') {
        toDamage = ((1 - this.activeObject.stats.resist) * this.itemStore.equippedStats.magicDamage) - this.activeObject.stats.energyArmor
        toAccuracy = this.itemStore.equippedStats.magicAccuracy - this.activeObject.stats.magicDodge
      }

      //always have a maxhit of at least 1
      if (toDamage < 1) {
        toDamage = 1
      }
      toDamage = this.damageRoll(toDamage, toAccuracy, toCrit)
      if (toDamage[1] == 3) {
        this.eHitColor = '#dca936' //crit
      } else if (toDamage[1] == 1) {
        this.eHitColor = '#6c757d' //graze
      } else {
        this.eHitColor = '#dc3644' //hit
      }
      toDamage = toDamage[0]

      //if damage is greater than health, deal health damage
      if (toDamage > this.eHealth) {
        toDamage = this.eHealth
      }

      //recieve xp for dealing damage based on style and stance
      if (this.itemStore.preStance > 0) {
        this.skillStore.addXP(this.accuracySkillID, toDamage * this.xpMulti)
      }

      if (this.currentStyle == 'melee') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.strengthSkillID, toDamage * this.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.blockSkillID, toDamage * this.xpMulti)
        }
      }
      if (this.currentStyle == 'ranged') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.markshipSkillID, toDamage * this.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.reflexSkillID, toDamage * this.xpMulti)
        }
      }
      if (this.currentStyle == 'magic') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.spiritSkillID, toDamage * this.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.acuitySkillID, toDamage * this.xpMulti)
        }
      }

      // console.log('damaged dealt ' + toDamage)
      if (toDamage == 0) {
        this.eHit = -1
      } else {
        this.eHit = toDamage
      }
      
      this.eHealth -= toDamage
    },

    attackDragon() {
      let toDamage = 0
      let toAccuracy = 0
      let toCrit = 1.25

      //calculate damage based on style
      if (this.eBestStyle == 'melee') {
        toDamage = ((1 - this.itemStore.equippedStats.resist) * this.activeObject.stats.meleeDamage) - this.itemStore.equippedStats.physicalArmor
        toAccuracy = this.activeObject.stats.meleeAccuracy - this.itemStore.equippedStats.meleeDodge
      }
      if (this.eBestStyle == 'ranged') {
        toDamage = ((1 - this.itemStore.equippedStats.resist) * this.activeObject.stats.rangedDamage) - this.itemStore.equippedStats.physicalArmor
        toAccuracy = this.activeObject.stats.rangedAccuracy - this.itemStore.equippedStats.rangedDodge
      }
      if (this.eBestStyle == 'magic') {
        toDamage = ((1 - this.itemStore.equippedStats.resist) * this.activeObject.stats.magicDamage) - this.itemStore.equippedStats.energyArmor
        toAccuracy = this.activeObject.stats.magicAccuracy - this.itemStore.equippedStats.magicDodge
      }
      
      //always have a maxhit of at least 1
      if (toDamage < 1) {
        toDamage = 1
      }
      toDamage = this.damageRoll(toDamage, toAccuracy, toCrit)
      if (toDamage[1] == 3) {
        this.dragonHitColor = '#dca936' //crit
      } else if (toDamage[1] == 1) {
        this.dragonHitColor = '#6c757d' //graze
      } else {
        this.dragonHitColor = '#dc3644' //hit
      }
      toDamage = toDamage[0]

      //if damage is greater than health, deal health damage
      if (toDamage > this.currentHealth) {
        toDamage = this.currentHealth
      }

      //recieve xp for recieving damage, but not too much
      this.skillStore.addXP(this.vitalitySkillID, toDamage)

      // console.log('damaged recieved ' + toDamage)
      if (toDamage == 0) {
        this.dragonHit = -1
      } else {
        this.dragonHit = toDamage
      }
      this.currentHealth -= toDamage
    },

    enemyDefeated() {
      this.activeObject.totalCount += 1
      console.log('yay, kc ' + this.activeObject.totalCount)

      //gives guarenteed drops
      for (let i in this.activeObject.alwaysDrops) {
        //if the item has a range roll, roll it, otherwise 1
        let rangeRoll = 1
        if (this.activeObject.alwaysDrops[i].itemRange != undefined) {
           rangeRoll = this.randomIntRange(this.activeObject.alwaysDrops[i].itemRange[0], this.activeObject.alwaysDrops[i].itemRange[1])
        }

        this.itemStore.changeItemCount(this.activeObject.alwaysDrops[i].itemID, rangeRoll)
      }

      //gives random drops
      let drop = this.activeObject.randomDrops
      //if there's a random drop table
      if (drop.length > 0) {
        //finds the random drop, if random drop is 'nothing' then discard
        drop = this.weightedRandom(drop) ?? 0
        if (drop.itemID) {
          //if the item has a range roll, roll it, otherwise 1
          let rangeRoll = 1
          if (drop.itemRange != undefined) {
            rangeRoll = this.randomIntRange(drop.itemRange[0], drop.itemRange[1])
          }

          this.itemStore.changeItemCount(drop.itemID, rangeRoll)
        }
      }

      //gives exploration xp if kobold map is equipped
      if (this.itemStore.equippedTools.explorationTool.id == 'koboldMap') {
        this.skillStore.addXP(this.explorationSkillID, 3 + this.activeObject.location)
      }

      //if you're in a dungeon
      if (this.activeDungeon.id != undefined) {
        //increase rounds[1] by 1, checks if rounds is greater than current enemy amount, adds 1 to rounds[0]
        this.dungeonRound[1] += 1
        if (this.dungeonRound[1] >= this.activeObject.amount) {
          this.dungeonRound[0] += 1
          this.dungeonRound[1] = 0
        }

        //if rounds is greater than the amount of enemies in the dungeon, then you win
        if (this.dungeonRound[0] >= this.activeDungeon.rounds.length) {
          this.activeDungeon.totalCount += 1
          console.log('yay, dungeon kc ' + this.activeDungeon.totalCount)

          //gives guarenteed drops
          for (let i in this.activeDungeon.alwaysDrops) {
            //if the item has a range roll, roll it, otherwise 1
            let rangeRoll = 1
            if (this.activeDungeon.alwaysDrops[i].itemRange != undefined) {
              rangeRoll = this.randomIntRange(this.activeDungeon.alwaysDrops[i].itemRange[0], this.activeDungeon.alwaysDrops[i].itemRange[1])
            }

            this.itemStore.changeItemCount(this.activeDungeon.alwaysDrops[i].itemID, rangeRoll)
          }

          //gives random drops
          let drop = this.activeDungeon.randomDrops
          //if there's a random drop table
          if (drop.length > 0) {
            //finds the random drop, if random drop is 'nothing' then discard
            drop = this.weightedRandom(drop) ?? 0
            if (drop.itemID) {
              //if the item has a range roll, roll it, otherwise 1
              let rangeRoll = 1
              if (drop.itemRange != undefined) {
                rangeRoll = this.randomIntRange(drop.itemRange[0], drop.itemRange[1])
              }

              this.itemStore.changeItemCount(drop.itemID, rangeRoll)
            }
          }

          //you win, restart the dungeon
          this.dungeonRound[0] = 0
          this.activeObject = this.activeDungeon.rounds[0]
          setTimeout(this.clearHits, 2000)
          this.findEnemy()
          return
        }

        //there is yet more dungeon
        this.activeObject = this.activeDungeon.rounds[this.dungeonRound[0]]
      }

      setTimeout(this.clearHits, 2000)
      this.findEnemy()
    },

    //taken from https://blobfolio.com/2019/randomizing-weighted-choices-in-javascript/
    weightedRandom(data) {
      let total = 0
      for (let i = 0; i < data.length; ++i) {
        total += data[i].weight
      }

      // Total in hand, we can now pick a random value akin to our
      // random index from before.
      const threshold = Math.random() * total

      // Now we just need to loop through the main data one more time
      // until we discover which value would live within this
      // particular threshold. We need to keep a running count of
      // weights as we go, so let's just reuse the "total" variable
      // since it was already declared.
      total = 0
      for (let i = 0; i < data.length - 1; ++i) {
        // Add the weight to our running total.
        total += data[i].weight

        // If this value falls within the threshold, we're done!
        if (total >= threshold) {
          return data[i]
        }
      }

      // Wouldn't you know it, we needed the very last entry!
      return data[data.length - 1]
    },

    maimed() {
      console.log('aww, but debug healing')
      this.cancelAction()
      this.currentHealth = 5
    },

    checkAutoHealing() {
      //eat until past the healing threshold or food runs out, just in case you survive a hit that could have killed you
      while (this.currentHealth <= this.itemStore.equippedCombat.foodSlot.heals) {
        if (this.itemStore.equippedCombat.foodSlot.count <= 0) {
          break
        }
        this.healByObject(this.itemStore.equippedCombat.foodSlot)
      }
    },
    healByObject(temp) {
      //if health is full, do not attempt
      if (this.currentHealth >= this.skillStore.skills[this.vitalitySkillID].level * 5) {
        return
      }
      //if no healing items, do not attempt
      if (0 >= temp.count) {
        console.log('Not enough food, silly.')
        return
      }
      //heal the value, or don't if there's no healing
      this.currentHealth += temp.heals ?? 0
      //also heals for the mastery level
      if (temp.dcat == 'cookedFood') {
        this.currentHealth += this.bonusHeals(temp)
      }
      //if overhealing, then set to max health
      if (this.currentHealth > this.skillStore.skills[this.vitalitySkillID].level * 5) {
        this.currentHealth = this.skillStore.skills[this.vitalitySkillID].level * 5
      }
      //show your work
      this.currentHealthPercent = 100 * this.currentHealth / (this.skillStore.skills[this.vitalitySkillID].level * 5)
      //consume the object
      this.itemStore.changeItemCount(temp.id, -1, 'consumableItems')
    },
    bonusHeals(temp) {
      temp = this.cookingStore.activities.find(blep => blep.itemID === temp.id)
      return temp.mLevel
    },

    onHealthUp() {
      this.currentHealth += 5
      this.currentHealthPercent = 100 * this.currentHealth / (this.skillStore.skills[this.vitalitySkillID].level * 5)
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)

      this.attackProgress = 0
      this.attackPercent = 0

      this.eAttackProgress = 0
      this.eAttackPercent = 0

      this.eHealth = 0
      this.eHealthPercent = 100

      this.dragonHit = -1
      this.dragonHitColor = '#dc3644'
      this.eHit = -1
      this.eHitColor = '#dc3644'

      this.activeObject = {}
      this.activeDungeon = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')

      console.log('canceling action')
    },

    clearHits() {
      this.dragonHit = -1
      this.dragonHitColor = '#dc3644'
      this.eHit = -1
      this.eHitColor = '#dc3644'
    },

    findBestStyle(attackerStats, defenderStats) {
      let melee = 0
      let ranged = 0
      let magic = 0
      let toDamage = 1
      let toAccuracy = 0

      //melee
      toDamage = ((1 - defenderStats.resist) * attackerStats.meleeDamage) - defenderStats.physicalArmor
      toAccuracy = attackerStats.meleeAccuracy - defenderStats.meleeDodge
      melee = toDamage * this.findAccuracyModifier(toAccuracy) / attackerStats.speed
      console.log('melee score: ' + melee)

      //ranged
      toDamage = ((1 - defenderStats.resist) * attackerStats.rangedDamage) - defenderStats.physicalArmor
      toAccuracy = attackerStats.rangedAccuracy - defenderStats.rangedDodge
      ranged = toDamage * this.findAccuracyModifier(toAccuracy) / attackerStats.speed
      console.log('ranged score: ' + ranged)

      //magic
      toDamage = ((1 - defenderStats.resist) * attackerStats.magicDamage) - defenderStats.energyArmor
      toAccuracy = attackerStats.magicAccuracy - defenderStats.magicDodge
      magic = toDamage * this.findAccuracyModifier(toAccuracy) / attackerStats.speed
      console.log('magic score: ' + magic)

      let classArray = [[magic, 'magic'], [ranged, 'ranged'], [melee, 'melee']];
      classArray.sort(function (a, b) { return b[0] - a[0] });
      return classArray[0][1];

      //checks for best or equal to best, falls back to melee if none found
      if (magic >= ranged && magic >= melee) {
        return 'magic'
      }
      if (ranged >= melee && ranged >= magic) {
        return 'ranged'
      }
      return 'melee'
    },

    //does not account for crits or any damage modifiers
    findAccuracyModifier(acc) {
      if (acc = 0) {
        return 35.625 //3.125 + 31.25 + 1.25, graze + hit + crit
      }
      if (acc >= 100) {
        return 125  //always crit
      }

      acc = acc * 0.01
      if (acc >= 0.50) {
        return (62.5 * (1.00 - acc)) + (125 * acc) //crit eats hit
      }
      if (acc >= 0.25) {
        return (12.5 * (0.5 - acc)) + (62.5 * 0.5) + (125 * acc) //crit eat graze
      }
      if (acc > 0) {
        return (12.5 * 0.25) + (62.5 * 0.5) + (125 * acc) //crit eat miss
      }
      if (acc > -50) {
        return (12.5 * 0.25) + (62.5 * (0.5 + acc)) //miss eats hit
      }
      if (acc > -75) {
        return (12.5 * (1.00 + acc)) //miss eats graze
      }
      return 0
    },

    resetPlayerAttack() {
      if (this.currentStyle == 'best') {
        this.bestStyle = this.findBestStyle(this.itemStore.equippedStats, this.activeObject.stats)
      } else {
        this.bestStyle = this.currentStyle
      }
      this.attackProgress = 0
      this.attackPercent = 0
    },

    randomStyle(tempArray) {
      return tempArray[Math.floor(Math.random() * tempArray.length)]
    },

    damageRoll(maxHit, acc, crit) {
      let roll = this.randomIntRange(1, 100)
      let decimals = 0
      // console.log('roll: ' + roll + ' + ' + acc + ' = ' + (roll+acc))

      //miss
      if (roll + acc < 25) {
        return [0, 0]
      }
      //graze
      else if (roll + acc < 50) {
        //max hit is at least 1
        maxHit = Math.max(1, maxHit * 0.25)
        
        //take the decimal of max hit, randomly decide to round up or down depending on how close to 1.0 it is (exclusive)
        decimals = maxHit % 1
        if (Math.random() < decimals) {
          maxHit = Math.ceil(maxHit)
        } else {
          maxHit = Math.floor(maxHit)
        }
        return [this.randomIntRange(1, maxHit), 1]
      }
      //hit
      else if (roll + acc < 100) {

        //take the decimal of max hit, randomly decide to round up or down depending on how close to 1.0 it is (exclusive)
        decimals = maxHit % 1
        if (Math.random() < decimals) {
          maxHit = Math.ceil(maxHit)
        } else {
          maxHit = Math.floor(maxHit)
        }
        //minimum of 25% damage, rounded up
        return [this.randomIntRange(Math.ceil(maxHit * 0.25), maxHit), 2]
      }
      //crit
      else if (roll + acc >= 100) {
        maxHit = maxHit * crit

        //take the decimal of max hit, randomly decide to round up or down depending on how close to 1.0 it is (exclusive)
        decimals = maxHit % 1
        if (Math.random() < decimals) {
          maxHit = Math.ceil(maxHit)
        } else {
          maxHit = Math.floor(maxHit)
        }
        return [maxHit, 3]
      }
    },

    randomIntRange(min, max) {
      return Math.floor(Math.random() * (1 + max - min)) + min;
    },
  }
})