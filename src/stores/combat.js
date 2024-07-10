import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useItemStore } from '@/stores/inventory';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

export const useCombatStore = defineStore('combatStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    findTime: 0.1,

    activeObject: {},
    currentTimeout: 0,
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

    accuracySkillID: 0,
    strengthSkillID: 1,
    markshipSkillID: 2,
    spiritSkillID: 3,

    blockSkillID: 4,
    reflexSkillID: 5,
    acuitySkillID: 6,
    vitalitySkillID: 7,

    skillStore: useSkillStore(),
    itemStore: useItemStore(),
    smithingStore: useSmithingStore(),
    cookingStore: useCookingStore(),

    enemies: [
      {
        id: 'combatDummy',
        name: 'Combat Dummy',
        cat: 'common',
        location: -1, //any
        image: 'src/assets/icons/testIcon16.png',
        xpMulti: 1,
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
        cat: 'common',
        location: 0, //grove
        image: 'src/assets/icons/testIcon16.png',
        xpMulti: 2,
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
            itemID: 'meatGame',
          },
        ],
        randomDrops: [
          {
            weight: 20
          },
          {
            itemID: 'hide2',
            weight: 10
          },
        ],
      },
      {
        id: 'wildDeer',
        name: 'Fleeting Deer',
        cat: 'common',
        location: 0, //glade
        image: 'src/assets/icons/testIcon16.png',
        xpMulti: 2,
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
            itemID: 'meatGame',
            itemRange: [1, 2],
          },
        ],
        randomDrops: [
          {
            weight: 10
          },
          {
            itemID: 'hide2',
            weight: 10
          },
        ],
      },
    ]
  }),
  getters: {
  },
  actions: {
    setActiveAction(newActiveActivity) {

      //if you push the button again, do nothing
      if (newActiveActivity.id == this.activeObject.id) {
        return
      }

      clearTimeout(this.currentTimeout)

      this.activeObject = newActiveActivity
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Fighting: ')
      this.findEnemy()
    },

    findEnemy() {
      this.attackProgress = 0
      this.attackPercent = 0
      this.eAttackProgress = 0
      this.eAttackPercent = 0
      this.eHealth = this.activeObject.stats.health
      this.eBestStyle = this.randomStyle(this.activeObject.styles)

      this.currentTimeout = setTimeout(this.combatStep, this.findTime * 1000)
    },
    
    combatStep() {
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

      //repeat combat
      this.currentTimeout = setTimeout(this.combatStep, this.progressInterval)
    },

    attackEnemy() {
      let toDamage = 0
      let toAccuracy = 0
      let toCrit = 1.25

      //calculate damage based on style
      if (this.bestStyle == 'melee') {
        toDamage = ((1 - this.activeObject.stats.resist) * this.itemStore.equippedStats.meleeDamage) - this.activeObject.stats.physicalArmor
        toAccuracy = this.itemStore.equippedStats.meleeAccuracy - this.activeObject.stats.meleeDodge
      }
      if (this.bestStyle == 'ranged') {
        toDamage = ((1 - this.activeObject.stats.resist) * this.itemStore.equippedStats.rangedDamage) - this.activeObject.stats.physicalArmor
        toAccuracy = this.itemStore.equippedStats.rangedAccuracy - this.activeObject.stats.rangedDodge
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

      //if damage is greater than health, deal health damage
      if (toDamage > this.eHealth) {
        toDamage = this.eHealth
      }

      //recieve xp for dealing damage based on style and stance
      if (this.itemStore.preStance > 0) {
        this.skillStore.addXP(this.accuracySkillID, toDamage * this.activeObject.xpMulti)
      }

      if (this.currentStyle == 'melee') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.strengthSkillID, toDamage * this.activeObject.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.blockSkillID, toDamage * this.activeObject.xpMulti)
        }
      }
      if (this.currentStyle == 'ranged') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.markshipSkillID, toDamage * this.activeObject.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.reflexSkillID, toDamage * this.activeObject.xpMulti)
        }
      }
      if (this.currentStyle == 'magic') {
        if (this.itemStore.aggStance > 0) {
          this.skillStore.addXP(this.spiritSkillID, toDamage * this.activeObject.xpMulti)
        }
        if (this.itemStore.defStance > 0) {
          this.skillStore.addXP(this.acuitySkillID, toDamage * this.activeObject.xpMulti)
        }
      }

      // console.log('damaged dealt ' + toDamage)
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

      //if damage is greater than health, deal health damage
      if (toDamage > this.currentHealth) {
        toDamage = this.currentHealth
      }

      //recieve xp for recieving damage
      this.skillStore.addXP(this.vitalitySkillID, toDamage * this.activeObject.xpMulti)

      // console.log('damaged recieved ' + toDamage)
      //check if can heal, then deal damage, then check again, super tick eat
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

      if (drop.length > 0) {
        drop = this.weightedRandom(drop) ?? 0
        if (drop.itemID) {
          this.itemStore.changeItemCount(drop.itemID, 1)
        }
      }

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
      let tempHeal = this.itemStore.equippedCombat.foodSlot.heals ?? 0

      //eat until past the healing threshold, just in case you survive a hit that could have killed you
      while (this.currentHealth <= tempHeal) {
        this.healByObject(this.itemStore.equippedCombat.foodSlot)
      }
    },
    healByObject(temp) {
      let tempCount = temp.count ?? 0

      //if health is full, do not attempt
      if (this.currentHealth >= this.skillStore.skills[this.vitalitySkillID].level * 5) {
        return
      }
      //if no healing items .count, do not attempt
      if (0 >= tempCount) {
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
      //consume the object
      this.itemStore.changeItemCount(temp.id, -1, 'consumableItems')
    },
    bonusHeals(temp) {
      temp = this.cookingStore.activities.find(blep => blep.itemID === temp.id)
      return temp.mLevel
    },

    onHealthUp() {
      this.currentHealth += 5
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)

      this.attackProgress = 0
      this.attackPercent = 0

      this.eAttackProgress = 0
      this.eAttackPercent = 0

      this.eHealth = 0
      this.eHealthPercent = 100

      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')

      console.log('canceling action')
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
      this.attackProgress = 0
    },

    randomStyle(tempArray) {
      return tempArray[Math.floor(Math.random() * tempArray.length)]
    },

    damageRoll(maxHit, acc, crit) {
      let roll = this.randomIntRange(1, 100)
      // console.log('roll: ' + roll + ' + ' + acc + ' = ' + (roll+acc))

      //miss
      if (roll + acc < 25) {
        // console.log('miss')
        return 0
      }
      //graze
      else if (roll + acc < 50) {
        // console.log('graze')
        return this.randomIntRange(1, Math.ceil(maxHit * 0.25))
      }
      //hit
      else if (roll + acc < 100) {
        // console.log('hit')
        return this.randomIntRange(Math.ceil(maxHit * 0.25), Math.ceil(maxHit * 1))
      }
      //crit
      else if (roll + acc >= 100) {
        console.log('crit')
        return Math.ceil(maxHit * crit)
      }
    },

    randomIntRange(min, max) {
      return Math.floor(Math.random() * (1 + max - min)) + min;
    },
  }
})