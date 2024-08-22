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

    isFinding: false,
    dungeonEnemyCounter: 1,

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
    currentSpeedMod: 1,
    currentStatus: {
      poison: [0, 0, 0], // stacks, time to next tick, miliseconds remaining
      shock: [0, 0, 0],
    },

    eHealth: 0,
    eHealthPercent: 100,
    eAttackProgress: 0,
    eAttackPercent: 0,
    eBestStyle: 'melee',
    eStatus: {
      poison: [0, 0, 0],
      shock: [0, 0, 0],
    },

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
        flavor: 'Maybe it just needs a hug.',
        location: -1, //any
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'], //melee, ranged, magic
        stats: {
          health: 1,
          speed: 20,

          meleeDamage: 1,
          meleeAccuracy: 1,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [-1, 0],
          
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
        flavor: 'A most mischievous game.',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 3,
          speed: 2.0,

          meleeDamage: 1,
          meleeAccuracy: 2,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [-1, 0],
          
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
        flavor: 'Far from being herd.',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 6,
          speed: 2.4,

          meleeDamage: 2,
          meleeAccuracy: 4,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [-1, 0],
          
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
        id: 'treeSlug',
        name: 'Tree Slug',
        flavor: 'Slimy yet unsatisfying.',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 5,
          speed: 3.0,

          rangedDamage: 2,
          rangedAccuracy: 5,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [0, 0.15], //slow

          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: 6,
        },
        alwaysDrops: [
          {
            itemID: 'bones1',
          },
        ],
        randomDrops: [
          {
            itemID: 'money',
            itemRange: [1, 2],
            weight: 6
          },
          {
            itemID: 'copperRing',
            weight: 1
          },
          {
            itemID: 'copperAmmy',
            weight: 1
          },
        ],
      },
      {
        id: 'koboldExile',
        name: 'Kobold Exile',
        flavor: 'Not lost, just wandering.',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 8,
          speed: 2.2,

          meleeDamage: 3,
          meleeAccuracy: 6,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [-1, 0],
          
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
        flavor: 'More effective than a scarecrow.',
        location: 1, //canton
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 12,
          speed: 2.2,

          rangedDamage: 3,
          rangedAccuracy: 7,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0.05,

          slayer: [-1, 0],
          
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
            weight: 19
          },
          {
            itemID: 'meal2',
            weight: 9
          },
          {
            itemID: 'koboldSling',
            weight: 3
          },
        ],
      },
      {
        id: 'koboldRanger',
        name: 'Kobold Ranger',
        flavor: 'Redirects lost trespassers.',
        location: 1, //canton
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 14,
          speed: 2.6,

          rangedDamage: 4,
          rangedAccuracy: 9,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0.05,

          slayer: [-1, 0],
          
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
            itemRange: [1, 5],
          },
        ],
        randomDrops: [
          {
            itemID: 'money',
            itemRange: [2, 8],
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
      {
        id: 'sourLizard',
        name: 'Sour Lizard',
        flavor: 'Rock munching miner menace.',
        location: 1, //canton
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 11,
          speed: 2.0,

          meleeDamage: 3,
          meleeAccuracy: 8,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [1, 0.20], //poison

          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: 5,
        },
        alwaysDrops: [
          {
            itemID: 'bones1',
          },
          {
            itemID: 'scarabVenom',
          },
        ],
        randomDrops: [
          {
            weight: 27
          },
          {
            itemID: 'pinkGem',
            weight: 2
          },
          {
            itemID: 'yellowGem',
            weight: 2
          },
          {
            itemID: 'yellowRing',
            weight: 1
          },
        ],
      },
      {
        id: 'dimSprite',
        name: 'Dim Sprite',
        flavor: 'Still brighter than moss glow.',
        location: 2, //vale
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['magic'],
        stats: {
          health: 15,
          speed: 2.0,

          magicDamage: 3,
          magicAccuracy: 15,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0,

          slayer: [2, 0.40], //electric
          
          meleeDodge: 25,
          rangedDodge: 8,
          magicDodge: 8,
        },
        alwaysDrops: [
          {
            itemID: 'ashes1',
          },
        ],
        randomDrops: [
          {
            weight: 7
          },
          {
            itemID: 'spriteWings',
            weight: 1
          },
        ],
      },
      {
        id: 'rustedTurret',
        name: 'Rusted Turret',
        flavor: 'Authorized users remaining: Zero',
        location: 2, //vale
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['magic'],
        stats: {
          health: 17,
          speed: 2.4,

          magicDamage: 3,
          magicAccuracy: 9,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0.10,

          slayer: [-1, 0],
          
          meleeDodge: 20,
          rangedDodge: 8,
          magicDodge: 20,
        },
        alwaysDrops: [
          {
            itemID: 'ashes1',
          },
          {
            itemID: 'charge1',
            itemRange: [1, 5],
          },
        ],
        randomDrops: [
          {
            weight: 23
          },
          {
            itemID: 'blueGem',
            weight: 1
          },
        ],
      },
      {
        id: 'pitchingPlant',
        name: 'Pitching Plant',
        flavor: 'Keeps the gardens pest free.',
        location: 2, //vale
        image: 'src/assets/icons/testIcon16.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 18,
          speed: 2.4,

          rangedDamage: 3,
          rangedAccuracy: 8,

          physicalArmor: 0,
          energyArmor: 0,
          penetration: 0,
          resist: 0.05,

          slayer: [1, 0.25], //poison
          
          meleeDodge: 12,
          rangedDodge: 20,
          magicDodge: 12,
        },
        alwaysDrops: [
          {
            itemID: 'xylem1',
          },
        ],
        randomDrops: [
          {
            itemID: 'scarabVenom',
            weight: 16
          },
          {
            itemID: 'meatFlank',
            itemRange: [1, 2],
            weight: 15
          },
          {
            itemID: 'pitchingWand',
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
        image: 'src/assets/icons/area1.png',
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
            flavor: 'Herd it here first, folks.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 4,
            totalCount: 0,
            styles: ['melee'],
            stats: {
              health: 7,
              speed: 2.4,

              meleeDamage: 2,
              meleeAccuracy: 7,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0,

              slayer: [-1, 0],
              
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
            flavor: 'Not the friendliest deer.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['melee'],
            stats: {
              health: 40,
              speed: 2.4,

              meleeDamage: 4,
              meleeAccuracy: 12,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0.05,

              slayer: [-1, 0],
              
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
        image: 'src/assets/icons/area2.png',
        totalCount: 0,
        alwaysDrops: [
          {
            itemID: 'bronzeArrow',
            itemRange: [10, 20],
          },
        ],
        randomDrops: [
          {
            itemID: 'koboldCowl',
            weight: 4,
          },
          {
            itemID: 'koboldVest',
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
            flavor: 'The top percent of kobold archers.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 4,
            totalCount: 0,
            styles: ['ranged'],
            stats: {
              health: 16,
              speed: 2.6,

              rangedDamage: 4,
              rangedAccuracy: 10,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0.05,

              slayer: [-1, 0],
              
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
            flavor: 'Nap time is hereby ruined.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 2,
            totalCount: 0,
            styles: ['melee'],
            stats: {
              health: 19,
              speed: 2.4,

              meleeDamage: 4,
              meleeAccuracy: 10,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0.15,

              slayer: [-1, 0],
              
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
            flavor: 'Who gave them that title?',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['melee', 'ranged'],
            stats: {
              health: 60,
              speed: 2.8,

              meleeDamage: 4,
              meleeAccuracy: 15,
              rangedDamage: 5,
              rangedAccuracy: 15,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0.10,

              slayer: [-1, 0],
              
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
                itemID: 'meal2',
                itemRange: [2, 3],
                weight: 6
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Crumbling Tower',
        location: 2, //vale
        image: 'src/assets/icons/area3.png',
        totalCount: 0,
        alwaysDrops: [
          {
            itemID: 'charge4',
            itemRange: [10, 25],
          },
        ],
        randomDrops: [
          {
            itemID: 'towerHelmet',
            weight: 3,
          },
          {
            itemID: 'towerPlate',
            weight: 3,
          },
          {
            itemID: 'towerGreaves',
            weight: 3,
          },
          {
            itemID: 'towerMace',
            weight: 3,
          },
          {
            itemID: 'towerStaff',
            weight: 3,
          },
          {
            itemID: 'towerStylus',
            weight: 1,
          },
        ],
        rounds: [
          {
            id: 'bossTowerTurret',
            name: 'Tower Turret',
            flavor: 'In better repair than the walls.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 4,
            totalCount: 0,
            styles: ['magic'],
            stats: {
              health: 22,
              speed: 2.0,

              magicDamage: 4,
              magicAccuracy: 15,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0.10,

              slayer: [-1, 0],
              
              meleeDodge: 22,
              rangedDodge: 10,
              magicDodge: 22,
            },
            alwaysDrops: [
              {
                itemID: 'ashes1',
              },
            ],
            randomDrops: [
              {
                itemID: 'charge1',
                itemRange: [3, 6],
                weight: 7
              },
              {
                itemID: 'blueGem',
                weight: 1
              },
            ],
          },
          {
            id: 'bossPitchingPlant',
            name: 'Pitching Overgrowth',
            flavor: 'Product of an overachieving gardener.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['ranged'],
            stats: {
              health: 35,
              speed: 2.4,

              rangedDamage: 5,
              rangedAccuracy: 14,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0,

              slayer: [1, 0.25], //poison
              
              meleeDodge: 14,
              rangedDodge: 22,
              magicDodge: 14,
            },
            alwaysDrops: [
              {
                itemID: 'xylem1',
              },
            ],
            randomDrops: [
              {
                itemID: 'scarabVenom',
                itemRange: [2, 4],
                weight: 1
              },
              {
                itemID: 'meatFlank',
                itemRange: [2, 5],
                weight: 1
              },
            ],
          },
          {
            id: 'bossTower',
            name: 'Old Recluse',
            flavor: 'Enjoyed 99% of history by staying out of it.',
            image: 'src/assets/icons/testIcon16.png',
            amount: 1,
            totalCount: 0,
            styles: ['melee', 'magic'],
            stats: {
              health: 100,
              speed: 3.0,

              meleeDamage: 5,
              meleeAccuracy: 25,
              magicDamage: 7,
              magicAccuracy: 25,

              physicalArmor: 0,
              energyArmor: 0,
              penetration: 0,
              resist: 0.35,

              slayer: [-1, 0],
              
              meleeDodge: 35,
              rangedDodge: 35,
              magicDodge: 20,
            },
            alwaysDrops: [
              {
                itemID: 'ashes2',
              },
            ],
            randomDrops: [],
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
      this.skillStore.cancelCurrentActivity('combat')
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Fighting: ')

      this.isFinding = true
      this.attackProgress = 0
      this.attackPercent = 0
      this.eAttackProgress = 0
      this.eAttackPercent = 0
      this.eHealth = this.activeObject.stats.health
      this.eBestStyle = this.randomStyle(this.activeObject.styles)

      this.updateCurrentSpeedMod()

      this.currentTimeout = setTimeout(this.combatStep, this.findTime * 1000)
    },
    
    combatStep() {
      //if combat isn't paused, do everything
      if (this.combatPaused == false) {
        this.isFinding = false

        //status effects enemy
        if (this.eStatus.poison[0] >= 1) {
          //poison goes off every second
          if (this.eStatus.poison[1] >= 1000) {
            this.eHealth -= 1
            this.eStatus.poison[1] = 0

            //if poison kills enemy, win
            if (this.eHealth < 1) {
              this.enemyDefeated()
              return
            }
          }
          //after 8 seconds, remove poison stack
          if (this.eStatus.poison[2] >= 8000) {
            this.eStatus.poison[0] -= 1
            this.eStatus.poison[2] = 0
          }
          this.eStatus.poison[1] += this.progressInterval
          this.eStatus.poison[2] += this.progressInterval
        }

        //dragon attacks enemy
        if (this.attackProgress >= 1000 * this.itemStore.equippedStats.meleeSpeed * this.currentSpeedMod) {
          this.dragonAttacksEnemy()
          this.attackProgress = 0

          //on success, stop combat
          if (this.eHealth < 1) {
            this.enemyDefeated()
            return
          }

          //if style is best, then use best, otherwise use forced style
          if (this.currentStyle == 'best') {
            this.bestStyle = this.findBestStyle(this.itemStore.equippedStats, this.activeObject.stats)
          } else {
            this.bestStyle = this.currentStyle
          }
        }

        //status effects dragon
        if (this.currentStatus.poison[0] >= 1) {
          //poison goes off every second
          if (this.currentStatus.poison[1] >= 1000) {
            this.currentHealth -= 1
            this.checkAutoHealing()

            //if poison kills dragon, lose
            if (this.currentHealth < 1) {
              this.maimed()
              return
            }
            this.currentStatus.poison[1] = 0 - this.progressInterval
          }

          //after 8 seconds, remove poison stack
          if (this.currentStatus.poison[2] >= 8000) {
            this.currentStatus.poison[0] -= 1
            this.currentStatus.poison[2] = 0 - this.progressInterval
          }
          this.currentStatus.poison[1] += this.progressInterval
          this.currentStatus.poison[2] += this.progressInterval
        }

        if (this.currentStatus.shock[0] >= 1) {
          //after 0.5 seconds, remove shock stack
          if (this.currentStatus.shock[2] >= 500) {
            this.currentStatus.shock[0] -= 1
            this.currentStatus.shock[2] = 0 - this.progressInterval
          }
          this.currentStatus.shock[2] += this.progressInterval
        }

        //enemy attacks dragon
        if (this.eAttackProgress >= 1000 * this.activeObject.stats.speed) {
          //tick eat
          this.checkAutoHealing()
          this.enemyAttacksDragon()
          this.eAttackProgress = 0

          //on failure, stop combat
          if (this.currentHealth < 1) {
            this.maimed()
            return
          }

          //if survived, check if can heal and choose new attack
          this.checkAutoHealing()
          this.eBestStyle = this.randomStyle(this.activeObject.styles)
        }

        //only progress the interval if not shocked
        if (this.currentStatus.shock[0] < 1) {
          this.attackProgress += this.progressInterval
        }
        if (this.eStatus.shock[0] < 1) {
          this.eAttackProgress += this.progressInterval
        }

        this.attackPercent = this.attackProgress / (10 * this.itemStore.equippedStats.meleeSpeed)
        this.eAttackPercent = this.eAttackProgress / (10 * this.activeObject.stats.speed)

        this.currentHealthPercent = 100 * this.currentHealth / (this.skillStore.skills[this.vitalitySkillID].level * 5)
        this.eHealthPercent = 100 * this.eHealth / this.activeObject.stats.health
      }

      //repeat combat
      this.currentTimeout = setTimeout(this.combatStep, this.progressInterval)
    },

    dragonAttacksEnemy() {
      let toDamage = 0
      let toAccuracy = 0
      let toCrit = 1.25

      //calculate damage based on style
      if (this.bestStyle == 'melee') {
        //max hit * (enemy resistance - penetration) - relevant armor
        toDamage = ((1 - Math.max(0, this.activeObject.stats.resist - this.itemStore.equippedStats.meleePen)) * this.itemStore.equippedStats.meleeDamage)

        toAccuracy = this.itemStore.equippedStats.meleeAccuracy - this.activeObject.stats.meleeDodge
      }
      if (this.bestStyle == 'ranged') {
        toDamage = ((1 - this.activeObject.stats.resist) * this.itemStore.equippedStats.rangedDamage)
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
        toDamage = ((1 - this.activeObject.stats.resist) * this.itemStore.equippedStats.magicDamage)
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
      //precision
      if (this.itemStore.preStance > 0) {
        this.skillStore.addXP(this.accuracySkillID, toDamage * this.xpMulti)
      }

      //aggressive/defensive
      if (this.bestStyle == 'melee') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.strengthSkillID, toDamage * this.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.blockSkillID, toDamage * this.xpMulti)
        }
      }
      if (this.bestStyle == 'ranged') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.markshipSkillID, toDamage * this.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.reflexSkillID, toDamage * this.xpMulti)
        }
      }
      if (this.bestStyle == 'magic') {
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
        this.enemyGetSpecialAttacked()
      }
      
      this.eHealth -= toDamage
    },

    enemyAttacksDragon() {
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
        this.dragonGetSpecialAttacked()
      }
      this.currentHealth -= toDamage
    },

    updateCurrentSpeedMod() {
      this.currentSpeedMod = 1

      //gooey 
      if (this.activeObject.stats.slayer != undefined) { //TODO add .slayer [] to everything?
        if (0 == this.activeObject.stats.slayer[0] ?? -1) {
          this.currentSpeedMod += this.activeObject.stats.slayer[1] //TODO slayer mastery/equipment mitigates chances
        }
      }
    },

    enemyGetSpecialAttacked() {
      //poison
      if (this.bestStyle == 'melee') {
        if (Math.random() < this.itemStore.equippedStats.poisonChance[0]) {
          this.eStatus.poison[0] += 1
        }
      }
      if (this.bestStyle == 'ranged') {
        if (Math.random() < this.itemStore.equippedStats.poisonChance[1]) {
          this.eStatus.poison[0] += 1
        }
      }
      if (this.bestStyle == 'magic') {
        if (Math.random() < this.itemStore.equippedStats.poisonChance[2]) {
          this.eStatus.poison[0] += 1
        }
      }
    },

    dragonGetSpecialAttacked() {
      if (this.activeObject.stats.slayer != undefined) {
        //poison
        if (1 == this.activeObject.stats.slayer[0] ?? -1) {
          if (Math.random() < this.activeObject.stats.slayer[1]) { //TODO slayer mastery/equipment mitigates chances
            this.currentStatus.poison[0] += 1
          }
        }

        //shock
        if (2 == this.activeObject.stats.slayer[0] ?? -1) {
          if (Math.random() < this.activeObject.stats.slayer[1]) { //TODO slayer mastery/equipment mitigates chances
            this.currentStatus.shock[0] += 1
          }
        }

      }
    },

    enemyDefeated() {
      this.eHealth = 0
      this.eHealthPercent = 0
      this.clearStatusEffects()

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

          if (drop.itemID == 'money') {
            this.itemStore.changeItemCount('money', Math.ceil(rangeRoll * (1 + this.itemStore.equippedStats.moneyDrop)), 'resourceItems')

          } else {
            this.itemStore.changeItemCount(drop.itemID, rangeRoll)
          }
        }
      }

      //gives exploration xp if kobold map is equipped and it will probably return a number instead of breaking exploration xp storage
      if (this.itemStore.equippedTools.explorationTool.id == 'koboldMap' && this.activeObject.location != undefined) {
        this.skillStore.addXP(this.explorationSkillID, 3 + this.activeObject.location)
      }

      //if you're in a dungeon
      if (this.activeDungeon.id != undefined) {

        this.dungeonEnemyCounter += 1
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
          this.dungeonEnemyCounter = 1
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
      console.log('aww, but free death healing')
      this.cancelAction()
      this.currentHealth = 3
      this.currentHealthPercent = 100 * this.currentHealth / (this.skillStore.skills[this.vitalitySkillID].level * 5)
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
      this.isFinding = false

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

      this.clearStatusEffects()

      this.activeObject = {}
      this.activeDungeon = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')
    },

    clearHits() {
      this.dragonHit = -1
      this.dragonHitColor = '#dc3644'
      this.eHit = -1
      this.eHitColor = '#dc3644'
    },

    clearStatusEffects() {
      this.currentStatus.poison = [0, 0, 0]
      this.currentStatus.shock = [0, 0, 0]

      this.eStatus.poison = [0, 0, 0]
      this.eStatus.shock = [0, 0, 0]
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

      //my mate wrote this
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