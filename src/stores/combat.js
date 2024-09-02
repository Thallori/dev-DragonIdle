import { defineStore } from 'pinia'

import { useDiaStore as diaStore } from '@/stores/dialog'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useSkillStore as skillStore } from '@/stores/skills'
import { useCookingStore as cookingStore } from '@/stores/cooking'

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
    currentTimeout: null,
    hpRegenTimeout: null,
    hpRegenProgress: 0,
    dungeonRound: [0, 0],
    currentStyle: 'melee',

    currentHealth: 5,
    currentHealthPercent: 100,
    attackProgress: 0,
    attackPercent: 0,
    bestStyle: 'melee',
    currentSpeedMod: 1,
    currentStatus: {
      maimed: 0,
      poison: [0, 0], //total time remaining, time to next tick
      shock: 0,
    },
    maimedTimeout: null,

    hugHealth: 0,

    eHealth: 0,
    eHealthPercent: 0,
    eAttackProgress: 0,
    eAttackPercent: 0,
    eBestStyle: 'melee',
    eStatus: {
      poison: [0, 0],
      shock: 0,
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

    enemies: [
      {
        id: 'combatDummy',
        name: 'Combat Dummy',
        flavor: 'Maybe it just needs a hug.',
        location: -1, //any
        image: 'src/assets/icons/dummy.png',
        totalCount: 0,
        styles: ['melee'], //melee, ranged, magic
        stats: {
          health: 1,
          speed: 20,

          meleeDamage: 1,
          meleeAccuracy: 1,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
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
        image: 'src/assets/icons/fox.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 3,
          speed: 2.0,

          meleeDamage: 1,
          meleeAccuracy: 2,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
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
        id: 'loneWolf',
        name: 'Lone Wolf',
        flavor: 'No trade requests please, they stand alone.',
        location: 0, //glade
        image: 'src/assets/icons/wolf.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 6,
          speed: 2.2,

          meleeDamage: 2,
          meleeAccuracy: 4,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
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
        flavor: "They're slimy yet unsatisfying.",
        location: 0, //glade
        image: 'src/assets/icons/greenslug.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 5,
          speed: 3.0,

          rangedDamage: 2,
          rangedAccuracy: 5,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
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
        image: 'src/assets/icons/koboldexile.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 8,
          speed: 2.2,

          meleeDamage: 3,
          meleeAccuracy: 6,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0.05,

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
            weight: 7
          },
          {
            itemID: 'meal1',
            weight: 4
          },
          {
            itemID: 'koboldDagger',
            weight: 2
          },
          {
            itemID: 'koboldChest',
            weight: 2
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
        image: 'src/assets/icons/koboldslinger.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 12,
          speed: 2.2,

          rangedDamage: 3,
          rangedAccuracy: 7,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0.05,

          slayer: [-1, 0],
          
          meleeDodge: 7,
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
        image: 'src/assets/icons/koboldarcher.png',
        totalCount: 0,
        styles: ['ranged'],
        stats: {
          health: 14,
          speed: 2.6,

          rangedDamage: 4,
          rangedAccuracy: 9,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0.05,

          slayer: [-1, 0],
          
          meleeDodge: 9,
          rangedDodge: 15,
          magicDodge: 15,
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
        name: 'Sour Stonemite',
        flavor: 'Rock munching miner menace.',
        location: 1, //canton
        image: 'src/assets/newness/huggyboi.png',
        totalCount: 0,
        styles: ['melee'],
        stats: {
          health: 11,
          speed: 2.0,

          meleeDamage: 3,
          meleeAccuracy: 8,

          physicalArmor: 0,
          energyArmor: 0,
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0,

          slayer: [1, 0.20], //poison

          meleeDodge: 10,
          rangedDodge: 10,
          magicDodge: 10,
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
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0,

          slayer: [2, 0.40], //electric
          
          meleeDodge: 32,
          rangedDodge: 14,
          magicDodge: 14,
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
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0.10,

          slayer: [-1, 0],
          
          meleeDodge: 28,
          rangedDodge: 15,
          magicDodge: 28,
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
          meleePen: 0,
          rangedPen: 0,
          magicPen: 0,
          resist: 0.05,

          slayer: [1, 0.15], //poison
          
          meleeDodge: 16,
          rangedDodge: 30,
          magicDodge: 16,
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
            image: 'src/assets/icons/deer.png',
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
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
            flavor: 'Rebuilt better, stronger, but not faster.',
            image: 'src/assets/icons/deerant.png',
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
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
            image: 'src/assets/icons/koboldarcher2.png',
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
              resist: 0.05,

              slayer: [-1, 0],
              
              meleeDodge: 11,
              rangedDodge: 17,
              magicDodge: 17,
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
            image: 'src/assets/icons/koboldguard2.png',
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
              resist: 0.15,

              slayer: [-1, 0],
              
              meleeDodge: 17,
              rangedDodge: 17,
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
            image: 'src/assets/icons/koboldduke2.png',
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
              resist: 0.10,

              slayer: [-1, 0],
              
              meleeDodge: 30,
              rangedDodge: 17,
              magicDodge: 30,
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
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
              resist: 0,

              slayer: [1, 0.25], //poison
              
              meleeDodge: 18,
              rangedDodge: 32,
              magicDodge: 18,
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
              health: 85,
              speed: 3.0,

              meleeDamage: 5,
              meleeAccuracy: 25,
              magicDamage: 7,
              magicAccuracy: 25,

              physicalArmor: 0,
              energyArmor: 0,
              meleePen: 0,
              rangedPen: 0,
              magicPen: 0,
              resist: 0.35,

              slayer: [-1, 0],
              
              meleeDodge: 40,
              rangedDodge: 40,
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
    saveAll() {
      localStorage.setItem('combat-combatPaused', JSON.stringify(this.combatPaused))
      localStorage.setItem('combat-currentHealth', JSON.stringify(this.currentHealth))
      localStorage.setItem('combat-currentStyle', JSON.stringify(this.currentStyle))
      localStorage.setItem('combat-dungeonRound', JSON.stringify(this.dungeonRound))
      localStorage.setItem('combat-dungeonEnemyCounter', JSON.stringify(this.dungeonEnemyCounter))
      localStorage.setItem('combat-activeDungeon', JSON.stringify(this.activeDungeon))
      localStorage.setItem('combat-activeObject', JSON.stringify(this.activeObject))

      let tempEnemies = []
      for (let i in this.enemies) {
        tempEnemies[i] = {
          id: this.enemies[i].id,
          totalCount: this.enemies[i].totalCount,
        }
      }
      localStorage.setItem('combat-enemies', JSON.stringify(tempEnemies))

      let tempDungeons = []
      for (let i in this.dungeons) {

        let tempRounds = []
        for (let t in this.dungeons[i].rounds) {
          tempRounds[t] = {
            id: this.dungeons[i].rounds[t].id,
            totalCount: this.dungeons[i].rounds[t].totalCount,
          }
        }

        tempDungeons[i] = {
          id: this.dungeons[i].id,
          totalCount: this.dungeons[i].totalCount,
          rounds: tempRounds,
        }
      }
      localStorage.setItem('combat-dungeons', JSON.stringify(tempDungeons))

      tempEnemies = null
      tempDungeons = null
    },
    loadAll() {
      this.combatPaused = JSON.parse(localStorage.getItem('combat-combatPaused'))
      this.currentHealth = JSON.parse(localStorage.getItem('combat-currentHealth'))
      this.currentStyle = JSON.parse(localStorage.getItem('combat-currentStyle'))

      let tempObject = {}
      let tempEnemies = JSON.parse(localStorage.getItem('combat-enemies'))
      for (let i in tempEnemies) {
        tempObject = this.enemies.find(t => t.id === tempEnemies[i].id)
        tempObject.totalCount = tempEnemies[i].totalCount
      }

      let tempDungeons = JSON.parse(localStorage.getItem('combat-dungeons'))
      for (let i in tempDungeons) {
        // tempObject = this.dungeons.find(t => t.id === tempDungeons[i].id)
        this.dungeons[i].totalCount = tempDungeons[i].totalCount

        for (let t in tempDungeons[i].rounds) {
          // tempObject = this.dungeons[i].rounds.find(t => t.id === tempDungeons[i].rounds[t].id)
          this.dungeons[i].rounds[t].totalCount = tempDungeons[i].rounds[t].totalCount
        }
      }

      tempObject = null
      tempEnemies = null
      tempDungeons = null
      this.currentHealthPercent = 100 * this.currentHealth / (skillStore().skills[this.vitalitySkillID].level * 5)
      this.resetDragonAttack()
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeDungeon = JSON.parse(localStorage.getItem('combat-activeDungeon'))
      if (this.activeDungeon.id != undefined) {
        this.dungeonRound = JSON.parse(localStorage.getItem('combat-dungeonRound'))
        this.dungeonEnemyCounter = JSON.parse(localStorage.getItem('combat-dungeonEnemyCounter'))

        this.activeDungeon = this.dungeons.find(t => t.id === this.activeDungeon.id)
        this.activeObject = this.activeDungeon.rounds[this.dungeonRound[0]]
        this.findEnemy()
        return
      }

      this.activeObject = JSON.parse(localStorage.getItem('combat-activeObject'))
      if (this.activeObject.id != undefined) {
        this.activeObject = this.enemies.find(t => t.id === this.activeObject.id)
        this.findEnemy()
        return
      }
      this.cancelAction()
    },

    setActiveDungeon(newActiveDungeon) {
    //if you push the button again, do nothing
      if (newActiveDungeon.id == this.activeDungeon.id) {
        return
      }
      this.cancelAction()

      this.activeDungeon = newActiveDungeon
      this.activeObject = this.activeDungeon.rounds[0]
      skillStore().setCurrentActivity(this.activeDungeon)
      skillStore().setCurrentCat('Raiding: ')
      this.findEnemy()
    },
    setActiveAction(newActiveActivity) {
      //if you push the button again, do nothing
      if (newActiveActivity.id == this.activeObject.id) {
        return
      }
      this.cancelAction()

      this.activeObject = newActiveActivity
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Fighting: ')
      this.findEnemy()
    },

    findEnemy() {
      skillStore().cancelCurrentActivity('combat')
      this.resetDragonAttack()
      this.resetEnemyAttack()
      this.updateCurrentSpeedMod()
      this.checkAutoHealing()
      this.hugHealth = 0

      this.isFinding = true
      this.eHealth = this.activeObject.stats.health
      this.eBestStyle = this.randomStyle(this.activeObject.styles)

      this.currentTimeout = setTimeout(this.preCombatStep, this.findTime * 1000)
    },

    preCombatStep() {
      skillStore().cancelCurrentActivity('combat')
      this.isFinding = false
      this.eHealthPercent = 100 * this.eHealth / this.activeObject.stats.health
      this.combatStep()
    },
    combatStep() {
      //if combat isn't paused, do everything
      if (this.combatPaused == false) {
        //status effects enemy, gives advantage to dragon in case mutual defeat
        this.enemyIsPoisonedEffect()
        this.enemyIsShockedEffect()
        if (this.eHealth < 1) {
          this.enemyDefeated()
          return
        }
        //dragon status effects
        this.dragonIsPoisonedEffect()
        this.dragonIsShockedEffect()
        if (this.currentHealth < 1) {
          this.maimed()
          return
        }

        //dragon attacks enemy when progress is full
        if (this.attackProgress >= 1000 * itemStore().equippedStats.meleeSpeed * this.currentSpeedMod) {
          this.dragonAttacksEnemy()
          //on success, stop combat
          if (this.eHealth < 1) {
            this.enemyDefeated()
            return
          }
          if (this.hugHealth >= this.activeObject.stats.health) {
            this.pacifyEnemy()
            return
          }
          this.resetDragonAttack()
        }

        //enemy attacks dragon
        if (this.eAttackProgress >= 1000 * this.activeObject.stats.speed) {
          this.enemyAttacksDragon()
          this.resetEnemyAttack()
          //on failure, stop combat
          if (this.currentHealth < 1) {
            this.maimed()
            return
          }
          this.eBestStyle = this.randomStyle(this.activeObject.styles)
        }

        //only progress the interval if not shocked
        if (this.currentStatus.shock < 1) {
          this.attackProgress += this.progressInterval
          this.attackPercent = this.attackProgress / (10 * itemStore().equippedStats.meleeSpeed * this.currentSpeedMod)
        }
        if (this.eStatus.shock < 1) {
          this.eAttackProgress += this.progressInterval
          this.eAttackPercent = this.eAttackProgress / (10 * this.activeObject.stats.speed)
        }
      }
      //repeat combat
      this.currentTimeout = setTimeout(this.combatStep, this.progressInterval)
    },

    dragonAttacksEnemy() {
      //if hug, then try to pacify
      if (this.currentStyle == 'hug') {
        this.enemyHugDamage(1)
        return
      }

      let toDamage = this.calculatedDamage(this.bestStyle, 1.25, itemStore().equippedStats, this.activeObject.stats)
      //use oil
      if (this.bestStyle == 'melee') {
        //if there is oil
        if (itemStore().equippedCombat.oilSlot.id != undefined) {
          //remove 1 oil and unequip if count is 0
          itemStore().changeItemCount(itemStore().equippedCombat.oilSlot.id, -1, 'equipmentItems')
          if (itemStore().equippedCombat.oilSlot.count <= 0) {
            itemStore().equipItem(itemStore().equippedCombat.oilSlot)
          }
        }
      }
      //use ammo
      if (this.bestStyle == 'ranged') {
        //if the weapon has required ammo and the required ammo is equipped
        if (itemStore().equippedCombat.rangedSlot.requiredAmmo == itemStore().equippedCombat.ammoSlot.ammoType) {
          //remove 1 ammo and unequip if count is 0
          itemStore().changeItemCount(itemStore().equippedCombat.ammoSlot.id, -1, 'equipmentItems')
          if (itemStore().equippedCombat.ammoSlot.count <= 0) {
            itemStore().equipItem(itemStore().equippedCombat.ammoSlot)
          }
        }
      }
      //use charge
      if (this.bestStyle == 'magic') {
        //if there is charge
        if (itemStore().equippedCombat.chargeSlot.id != undefined) {
          //remove 1 charge and unequip if count is 0
          itemStore().changeItemCount(itemStore().equippedCombat.chargeSlot.id, -1, 'equipmentItems')
          if (itemStore().equippedCombat.chargeSlot.count <= 0) {
            itemStore().equipItem(itemStore().equippedCombat.chargeSlot)
          }
        }
      }
      //if no damage is to be done, hitsplat miss and do nothing
      if (toDamage[0] == 0) {
        // console.log('attack missed')
        this.eHit = -1
        return
      }
      //if maimed, then halve the damage
      if (this.currentStatus.maimed > 0) {
        toDamage[0] = Math.ceil(toDamage[0] / 2)
      }
      //if damage is greater than health, deal health damage
      if (toDamage[0] > this.eHealth) {
        toDamage[0] = this.eHealth
      }
      //recieve xp for dealing damage based on style and stance
      //accurate
      if (itemStore().preStance > 0) {
        skillStore().addXP(this.accuracySkillID, toDamage[0] * this.xpMulti)
      }
      //aggressive/defensive
      if (this.bestStyle == 'melee') {
        if (itemStore().aggStance > 0) {
          skillStore().addXP(this.strengthSkillID, toDamage[0] * this.xpMulti)
        }
        if (itemStore().defStance > 0) {
          skillStore().addXP(this.blockSkillID, toDamage[0] * this.xpMulti)
        }
      }
      if (this.bestStyle == 'ranged') {
        if (itemStore().aggStance > 0) {
          skillStore().addXP(this.markshipSkillID, toDamage[0] * this.xpMulti)
        }
        if (itemStore().defStance > 0) {
          skillStore().addXP(this.reflexSkillID, toDamage[0] * this.xpMulti)
        }
      }
      if (this.bestStyle == 'magic') {
        if (itemStore().aggStance > 0) {
          skillStore().addXP(this.spiritSkillID, toDamage[0] * this.xpMulti)
        }
        if (itemStore().defStance > 0) {
          skillStore().addXP(this.acuitySkillID, toDamage[0] * this.xpMulti)
        }
      }
      this.eHit = toDamage[0]
      this.eHitColor = toDamage[1]
      this.enemyHealthDamage(toDamage[0])
      this.enemyGetSpecialAttacked()
    },
    enemyAttacksDragon() {
      let toDamage = this.calculatedDamage(this.eBestStyle, 1.25, this.activeObject.stats, itemStore().equippedStats)
      //if no damage is to be done, hitsplat miss and do nothing
      if (toDamage[0] == 0) {
        // console.log('attack dodged')
        this.dragonHit = -1
        return
      }
      //if damage is greater than health, deal health damage
      if (toDamage[0] > this.currentHealth) {
        toDamage[0] = this.currentHealth
      }
      //if hugging, then get 1xp for each 4 enemy accuracy on dodge 
      if (this.currentStyle == 'hug' && toDamage[0] == 0) {
        if (this.eBestStyle == 'melee') {
          skillStore().addXP(this.blockSkillID, 1 + Math.floor(this.activeObject.stats.meleeAccuracy / 4))
        }
        if (this.eBestStyle == 'ranged') {
          skillStore().addXP(this.reflexSkillID, 1 + Math.floor(this.activeObject.stats.rangedAccuracy / 4))
        }
        if (this.eBestStyle == 'magic') {
          skillStore().addXP(this.acuitySkillID, 1 + Math.floor(this.activeObject.stats.magicAccuracy / 4))
        }
      }
      //recieve xp for taking damage, but not too much
      skillStore().addXP(this.vitalitySkillID, toDamage[0])
      //hitsplat
      this.dragonHit = toDamage[0]
      this.dragonHitColor = toDamage[1]
      this.dragonHealthDamage(toDamage[0])
      this.dragonGetSpecialAttacked()
    },
    calculatedDamage(attackerStyle, attackerCritMod, attackerStats, defenderStats) {
      let toDamage = 0
      let toAccuracy = 0
      let toCrit = attackerCritMod
      //overpenetration does nothing
      //(maxHit * (1 - max0(enemy resistance - relevant penetration))) - relevant armor
      if (attackerStyle == 'melee') {
        toDamage = (attackerStats.meleeDamage * (1 - Math.max(0, defenderStats.resist - attackerStats.meleePen))) - defenderStats.physicalArmor

        toAccuracy = attackerStats.meleeAccuracy - defenderStats.meleeDodge
      }
      if (attackerStyle == 'ranged') {
        toDamage = (attackerStats.rangedDamage * (1 - Math.max(0, defenderStats.resist - attackerStats.rangedPen))) - defenderStats.physicalArmor

        toAccuracy = attackerStats.rangedAccuracy - defenderStats.rangedDodge
      }
      if (attackerStyle == 'magic') {
        toDamage = (attackerStats.magicDamage * (1 - Math.max(0, defenderStats.resist - attackerStats.magicPen))) - defenderStats.physicalArmor

        toAccuracy = attackerStats.magicAccuracy - defenderStats.magicDodge
      }
      //rolls damage (can be decimal), and recieves [int, 'color']
      toDamage = this.damageRoll(toDamage, toAccuracy, toCrit)
      return toDamage
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
        if (Math.random() < itemStore().equippedStats.poisonChance[0]) {
          this.eStatus.poison[0] = 8000
        }
      }
      if (this.bestStyle == 'ranged') {
        if (Math.random() < itemStore().equippedStats.poisonChance[1]) {
          this.eStatus.poison[0] = 8000
        }
      }
      if (this.bestStyle == 'magic') {
        if (Math.random() < itemStore().equippedStats.poisonChance[2]) {
          this.eStatus.poison[0] = 8000
        }
      }
    },
    enemyIsPoisonedEffect() {
      //if poison has a counter
      if (this.eStatus.poison[0] > 0) {
        //poison goes off every second
        if (this.eStatus.poison[1] >= 1000) {
          this.enemyHealthDamage(1)
          this.eStatus.poison[1] = 0
        }
        //[0] counts down, [1] counts up
        this.eStatus.poison[0] -= this.progressInterval
        this.eStatus.poison[1] += this.progressInterval
        return
      }
      this.eStatus.poison = [0, 0]
    },
    enemyIsShockedEffect() {
      //if shock has a counter
      if (this.eStatus.shock > 0) {
        this.eStatus.shock -= this.progressInterval
        return
      }
      this.eStatus.shock = 0
    },

    dragonGetSpecialAttacked() {
      if (this.activeObject.stats.slayer != undefined) {
        //poison
        if (1 == this.activeObject.stats.slayer[0] ?? -1) {
          if (Math.random() < this.activeObject.stats.slayer[1]) { //TODO slayer mastery/equipment mitigates chances
            this.currentStatus.poison[0] = 8000 //poisoned for 8s
          }
        }

        //shock
        if (2 == this.activeObject.stats.slayer[0] ?? -1) {
          if (Math.random() < this.activeObject.stats.slayer[1]) { //TODO slayer mastery/equipment mitigates chances
            this.currentStatus.shock = 1500 //shocked for 1.5s
          }
        }

      }
    },
    dragonIsPoisonedEffect() {
      //if poison has a counter
      if (this.currentStatus.poison[0] > 0) {
        //poison goes off every second
        if (this.currentStatus.poison[1] >= 1000) {
          this.dragonHealthDamage(1)
          this.currentStatus.poison[1] = 0
        }
        //[0] counts down, [1] counts up
        this.currentStatus.poison[0] -= this.progressInterval
        this.currentStatus.poison[1] += this.progressInterval
        return
      }
      this.currentStatus.poison = [0, 0]
    },
    dragonIsShockedEffect() {
      //if shock has a counter
      if (this.currentStatus.shock > 0) {
        this.currentStatus.shock -= this.progressInterval
        return
      }
      this.currentStatus.shock = 0
    },

    dragonHealthDamage(temp) {
      //tickeat
      this.checkAutoHealing()
      this.currentHealth -= temp
      this.currentHealthPercent = 100 * this.currentHealth / (skillStore().skills[this.vitalitySkillID].level * 5)
      //can heal if the damage was survived
      if (this.currentHealth > 0) {
        this.checkAutoHealing()
      }
    },
    maimed() {
      //cancels everything
      console.log('aww, but free death healing')
      this.cancelAction()
      this.currentHealth = 1
      this.currentHealthPercent = 100 * this.currentHealth / (skillStore().skills[this.vitalitySkillID].level * 5)

      this.currentStatus.maimed = 300000
    },

    enemyHealthDamage(temp) {
      this.eHealth -= temp
      this.eHealthPercent = 100 * this.eHealth / this.activeObject.stats.health
    },
    enemyHugDamage(temp) {
      this.hugHealth += temp
      this.eHit = -1
    },
    enemyDefeated() {
      this.clearEnemyHealth()
      this.clearStatusEffects()
      //the dummy doesn't care if you kill them, so count it with everyone else
      this.activeObject.totalCount += 1
      // console.log('yay, kc ' + this.activeObject.totalCount)
      //if you kill someone who isn't the combat dummy, you are no longer a pacifist
      if (this.activeObject.id != 'combatDummy') {
        if (skillStore().flags.pacifist == true) {
          skillStore().unlockCombat()
          skillStore().flags.pacifist = false
        }
        //if you kill someone after being told murder is wrong, you are just a murderer
        if (skillStore().flags.flawedPacifist == true) {
          skillStore().flags.flawedPacifist = false
        }
      }
      //gives drops
      this.alwaysDrops(this.activeObject.alwaysDrops)
      this.randomDrops(this.activeObject.randomDrops)
      //gives extra drops TODO makes values over 100% meaningful
      if (Math.random() < itemStore().equippedStats.extraDropChance) {
        this.alwaysDrops(this.activeObject.alwaysDrops)
        this.randomDrops(this.activeObject.randomDrops)
      }
      //gives exploration xp if kobold map is equipped and it will probably return a number instead of breaking exploration xp storage
      if (itemStore().equippedTools.explorationTool.id == 'koboldMap' && this.activeObject.location != undefined) {
        skillStore().addXP(this.explorationSkillID, 3 + this.activeObject.location)
      }
      //if you're in a dungeon
      if (this.activeDungeon.id != undefined) {
        this.dungeonStep()
        return
      }
      //hits don't disappear the moment of victory
      setTimeout(this.clearHits, 2000)
      this.findEnemy()
    },
    pacifyEnemy() {
      this.clearStatusEffects()
      //if you're in a dungeon
      if (this.activeDungeon.id != undefined) {
        this.dungeonStep()
        return
      }
      //if combat dummy, pause and show dialogue TODO all enemies have unique dialogue
      if (this.activeObject.id == 'combatDummy') {
        skillStore().check
        diaStore().startDia('combatDummy')
        this.combatPaused = true
        return
      }
      //hits don't disappear the moment of victory TODO the dialogue for pacification will cancel the action for you, since then the enemy can still be 'seen' in the attack window. even later, add special betrayal kills by skipping and suddenly changing attack styles
      setTimeout(this.clearHits, 2000)
      this.findEnemy()
    },

    dungeonStep() {
      //for display purposes only
      this.dungeonEnemyCounter += 1
      //increase rounds[1] by 1, checks if rounds is greater than current enemy amount, adds 1 to rounds[0]
      this.dungeonRound[1] += 1
      if (this.dungeonRound[1] >= this.activeObject.amount) {
        this.dungeonRound[0] += 1
        this.dungeonRound[1] = 0
      }
      //if rounds is greater than the amount of enemies in the dungeon, then you win
      if (this.dungeonRound[0] >= this.activeDungeon.rounds.length) {
        //adds dungeon kc
        this.activeDungeon.totalCount += 1
        // console.log('yay, dungeon kc ' + this.activeDungeon.totalCount)
        //gives drops
        this.alwaysDrops(this.activeDungeon.alwaysDrops)
        this.randomDrops(this.activeDungeon.randomDrops)
        //gives extra drops TODO makes values over 100% meaningful
        if (Math.random() < itemStore().equippedStats.extraDropChance) {
          this.alwaysDrops(this.activeDungeon.alwaysDrops)
          this.randomDrops(this.activeDungeon.randomDrops)
        }
        //1 in 200 chance of dropping runeword
        if (Math.random() < 0.005) {
          itemStore().addWord(this.activeDungeon.id + 6)
          //gives extra drops TODO makes values over 100% meaningful
          if (Math.random() < itemStore().equippedStats.extraDropChance) {
            itemStore().addWord(this.activeDungeon.id + 6)
          }
        }
        //if first time beating dungeon, then have a discussion
        //TODO all dungeons
        if (skillStore().flags.dungeon2 == false && this.activeDungeon.id == 2) {
          skillStore().dungeonDone('dungeon' + this.activeDungeon.id)
          this.combatPaused = true
          return
        }
        //restart the dungeon
        this.resetDungeon()
        this.activeObject = this.activeDungeon.rounds[0]
        setTimeout(this.clearHits, 2000)
        this.findEnemy()
        return
      }
      //there is yet more dungeon
      this.activeObject = this.activeDungeon.rounds[this.dungeonRound[0]]
      setTimeout(this.clearHits, 2000)
      this.findEnemy()
    },

    alwaysDrops(drop) {
      //if there's an always drop table
      if (drop.length > 0) {
        //for every item in the table
        for (let i in drop) {
          //if the item has a range roll, roll it, otherwise 1
          let rangeRoll = 1
          if (drop[i].itemRange != undefined) {
            rangeRoll = this.randomIntRange(drop[i].itemRange[0], drop[i].itemRange[1])
          }

          itemStore().changeItemCount(drop[i].itemID, rangeRoll)
        }
      }
    },
    randomDrops(drop) {
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
          
          itemStore().changeItemCount(drop.itemID, rangeRoll)
        }
      }
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

    dragonHeal(temp) {
      //if health is not full, heal
      if (this.currentHealth < skillStore().skills[this.vitalitySkillID].level * 5) {
        //if healing would put health overfull, then lower healing to the difference
        if (this.currentHealth + temp > skillStore().skills[this.vitalitySkillID].level * 5) {
          temp = (skillStore().skills[this.vitalitySkillID].level * 5) - this.currentHealth
        }
        // console.log('healing for: ' + temp)
        this.currentHealth += temp
        this.currentHealthPercent = 100 * this.currentHealth / (skillStore().skills[this.vitalitySkillID].level * 5)
      }
    },
    hpRegen() {
      if (this.hpRegenTimeout != null) {
        console.error("tried to start long-term combat loop when loop already exists")
        return
      }
      this.hpRegenLoop()
    },
    //TODO uh oh, we're putting long term things in here
    hpRegenLoop() {
      //if health is full, reset healing timer and stop counting down
      if (this.currentHealth >= skillStore().skills[this.vitalitySkillID].level * 5) {
        this.hpRegenProgress = 0
      } else {
        //heal every 60 seconds
        if (this.hpRegenProgress >= 60000) {
          this.hpRegenProgress = 0
          this.dragonHeal(1) //heal for 1
        }
        this.hpRegenProgress += 1000
      }
      //if maimed exists, then count it down
      if (this.currentStatus.maimed != 0) {
        this.currentStatus.maimed -= 1000
        //if maimed has less than a second left, remove it
        if (this.currentStatus.maimed < 1000) {
          this.currentStatus.maimed = 0
        }
      }
      //repeat every second
      this.hpRegenTimeout = setTimeout(this.hpRegenLoop, 1000)
    },

    checkAutoHealing() {
      //eat until past the healing threshold or food runs out, just in case you survive a hit that could have killed you
      while (this.currentHealth <= itemStore().equippedCombat.foodSlot.heals) {
        if (itemStore().equippedCombat.foodSlot.count <= 0) {
          break
        }
        this.healByObject(itemStore().equippedCombat.foodSlot)
      }
    },
    healByObject(temp) {
      let toHeal = 0
      //if health is full, do not attempt
      if (this.currentHealth >= skillStore().skills[this.vitalitySkillID].level * 5) {
        return
      }
      //if no healing items, do not attempt
      if (0 >= temp.count) {
        console.log('Not enough food, silly.')
        return
      }
      toHeal += temp.heals ?? 0
      //adds mastery level
      if (temp.dcat == 'cookedFood') {
        toHeal += this.bonusHeals(temp)
      }
      this.dragonHeal(toHeal)
      //consume the object
      itemStore().changeItemCount(temp.id, -1, 'consumableItems')
    },
    bonusHeals(temp) {
      temp = cookingStore().activities.find(t => t.itemID === temp.id)
      return temp.mLevel
    },
    onHealthUp() {
      this.currentHealth += 5
      if (this.currentHealth > skillStore().skills[this.vitalitySkillID].level * 5) {
        this.currentHealth = skillStore().skills[this.vitalitySkillID].level * 5
      }
      this.currentHealthPercent = 100 * this.currentHealth / (skillStore().skills[this.vitalitySkillID].level * 5)
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.isFinding = false

      this.resetDragonAttack()
      this.resetEnemyAttack()
      this.resetDungeon()

      this.clearActiveDungeon()
      this.clearActiveEnemy()
      this.clearStatusEffects()
      this.clearEnemyHealth()
      this.clearHits()

      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },
    resetDragonAttack() {
      if (this.currentStyle == 'best') {
        this.bestStyle = this.findBestStyle(itemStore().equippedStats, this.activeObject.stats)
      } else {
        this.bestStyle = this.currentStyle
      }
      this.attackProgress = 0
      this.attackPercent = 0
    },
    resetEnemyAttack() {
      this.eAttackProgress = 0
      this.eAttackPercent = 0
    },
    clearEnemyHealth() {
      this.hugHealth = 0
      this.eHealth = 0
      this.eHealthPercent = 0
    },
    resetDungeon() {
      this.dungeonEnemyCounter = 1
      this.dungeonRound = [0, 0]
    },
    clearActiveDungeon() {
      this.activeDungeon = {}
    },
    clearActiveEnemy() {
      this.activeObject = {}
    },
    clearHits() {
      this.dragonHit = -1
      this.dragonHitColor = '#dc3644'
      this.eHit = -1
      this.eHitColor = '#dc3644'
    },
    clearStatusEffects() {
      this.currentStatus.poison = [0, 0]
      this.currentStatus.shock = 0

      this.eStatus.poison = [0, 0]
      this.eStatus.shock = 0
    },

    findBestStyle(attackerStats, defenderStats) {
      let melee = 0
      let ranged = 0
      let magic = 0
      let toDamage = 1
      let toAccuracy = 0
      //melee
      if (attackerStats.meleeDamage != undefined) {
        toDamage = ((1 - defenderStats.resist) * attackerStats.meleeDamage) - defenderStats.physicalArmor
        toAccuracy = attackerStats.meleeAccuracy - defenderStats.meleeDodge

        melee = toDamage * this.findAccuracyModifier(toAccuracy) / attackerStats.speed
        console.log('melee score: ' + melee)
      }
      //ranged
      if (attackerStats.rangedDamage != undefined) {
        toDamage = ((1 - defenderStats.resist) * attackerStats.rangedDamage) - defenderStats.physicalArmor
        toAccuracy = attackerStats.rangedAccuracy - defenderStats.rangedDodge

        ranged = toDamage * this.findAccuracyModifier(toAccuracy) / attackerStats.speed
        console.log('ranged score: ' + ranged)
      }
      //magic
      if (attackerStats.magicDamage != undefined) {
        toDamage = ((1 - defenderStats.resist) * attackerStats.magicDamage) - defenderStats.energyArmor
        toAccuracy = attackerStats.magicAccuracy - defenderStats.magicDodge

        magic = toDamage * this.findAccuracyModifier(toAccuracy) / attackerStats.speed
        console.log('magic score: ' + magic)
      }
      //my mate wrote this
      //sorts scores and returns the best one
      let classArray = [[magic, 'magic'], [ranged, 'ranged'], [melee, 'melee']];
      classArray.sort(function (a, b) { return b[0] - a[0] });
      return classArray[0][1];
      //i wrote this
      //checks for best or equal to best, falls back to melee if none found
      if (magic >= ranged && magic >= melee) {
        return 'magic'
      }
      if (ranged >= melee && ranged >= magic) {
        return 'ranged'
      }
      return 'melee'
    },
    //does not account for crits, damage modifiers, or special
    findAccuracyModifier(acc) {
      //if accuracy difference is more than 100, then we already know the results
      if (acc >= 100) {
        return 125
      }
      //accuracy comes as an int, but should represent a percentage chance
      acc = acc * 0.01
      if (acc > 0.50) {
        return (62.5 * (1.00 - acc)) + (125 * acc) //crit eats hit
      }
      if (acc > 0.25) {
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
      return 0 //always misses
    },
    randomStyle(tempArray) {
      return tempArray[Math.floor(Math.random() * tempArray.length)]
    },

    damageRoll(maxHit, acc, crit) {
      let roll = this.randomIntRange(1, 100)
      // console.log('roll: ' + roll + ' + ' + acc + ' = ' + (roll+acc))
      //miss
      if (roll + acc < 25) {
        //0 is used to show no hitsplat
        return [0, 0]
      }
      //graze
      else if (roll + acc < 50) {
        //max hit is at least 1
        maxHit = Math.max(1, maxHit * 0.25)
        maxHit = this.randomIntRounding(maxHit)
        return [this.randomIntRange(1, maxHit), '#6c757d'] //gray
      }
      //hit
      else if (roll + acc < 100) {
        //max hit is at least 1
        maxHit = Math.max(1, maxHit)
        maxHit = this.randomIntRounding(maxHit)
        //minimum of 25% damage, rounded up
        return [this.randomIntRange(Math.ceil(maxHit * 0.25), maxHit), '#dc3644'] //red
      }
      //crit
      else if (roll + acc >= 100) {
        maxHit = maxHit * crit
        //max hit is at least 2
        maxHit = Math.max(2, maxHit)
        maxHit = this.randomIntRounding(maxHit)
        return [maxHit, '#dca936'] //yellow
      }
    },

    randomIntRange(min, max) {
      //random int range, inclusive
      return Math.floor(Math.random() * (1 + max - min)) + min
    },
    randomIntRounding(temp) {
      //removes leading digits
      let decimals = temp % 1
      //the bigger the decimal, the more likely to round up
      if (Math.random() < decimals) {
        return Math.ceil(temp)
      } else {
        return Math.floor(temp)
      }
    },
  }
})