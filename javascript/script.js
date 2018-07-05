$(document).ready(function() {

// Variable Declaration
  var reyJedi = {
    "HP": 15,
    "attacks": ["Staff Swipe", "Force Push"],
    "attacksInfo": ["A quick, nimble strike: 2-4 DMG", "Classic Force attack: Stun 1 turn."],
    "reyInfo": "A young apprentice",
    "hasAttacked": false,
    "isStunned": false,
    "wasStunned": false,
    "staffSwipe": function(target) {
      var dmg = Math.floor(Math.random() * 2) + 2
      target.HP = target.HP - dmg
      if (kyloSith.isCounter) {
        alert("Kylo strikes back!")
        reyJedi.HP = reyJedi.HP - Math.floor(dmg / 2)
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
      }
      reyJedi.hasAttacked = true
      $("#vaderHP").text("HP: " + vaderSith.HP + "/40")
      $("#kyloHP").text("HP:" + kyloSith.HP + "/25")
      gameTurnCheck()
    },
    "forcePush": function(target) {
      target.isStunned = true
      alert(target.Name + " is stunned!");
      reyJedi.hasAttacked = true
      gameTurnCheck()
    },
  };

  var lukeJedi = {
    "HP": 30,
    "attacks": ["Saber Assault", "Focus"],
    "attacksInfo": ["A heavy volley: 6-8 DMG", "Find resolve: Next ATK x2 DMG"],
    "lukeInfo": "The Jedi Master",
    "hasAttacked": false,
    "isStunned": false,
    "wasStunned": false,
    "isFocus": false,
    "saberAssault": function(target) {
      var dmg = Math.floor(Math.random() * 2) + 6
      if (lukeJedi.isFocus) {
        dmg = dmg * 2
        lukeJedi.isFocus = false
        $(".lukeText").text(lukeJedi.lukeInfo)
      }
      if (kyloSith.isCounter) {
        alert("Kylo strikes back!")
        lukeJedi.HP = lukeJedi.HP - Math.floor(dmg / 2)
        $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
      }
      target.HP = target.HP - dmg
      lukeJedi.hasAttacked = true
      $("#vaderHP").text("HP: " + vaderSith.HP + "/40")
      $("#kyloHP").text("HP:" + kyloSith.HP + "/25")
      gameTurnCheck()
    },
    "focus": function() {
      lukeJedi.isFocus = true
      lukeJedi.hasAttacked = true
      $(".lukeText").text("Focused")
      gameTurnCheck()
    },
  };

  var vaderSith = {
    "Name": "Darth Vader",
    "HP": 40,
    "attacks": ["Force Lightning", "Force Choke"],
    "vaderInfo": "The Sith Lord",
    "hasAttacked": false,
    "isStunned": false,
    "forceLightning": function(){
      var dmg = Math.floor(Math.random() * 2) + 2
      lukeJedi.HP = lukeJedi.HP - dmg
      reyJedi.HP = reyJedi.HP - dmg
      vaderSith.hasAttacked = true
      $("#reyHP").text("HP: " + reyJedi.HP + "/15")
      $("#lukeHP").text("HP:" + lukeJedi.HP + "/30")
    },
    "forceChoke": function(){
      var target = Math.floor(Math.random() * 2)
      if (target > 0) {
        if (!reyJedi.isStunned && !reyJedi.wasStunned) {
          reyJedi.isStunned = true
          vaderSith.hasAttacked = true
          alert("Rey is stunned!")
        }
        else {
          alert("Rey is not stunned!")
          break
        }
      }
      else {
        if (!lukeJedi.isStunned && !lukeJedi.wasStunned) {
          lukeJedi.isStunned = true
          vaderSith.hasAttacked = true
          alert("Luke is stunned!")
        }
        else {
          alert("Luke is not stunned!")
          break
        }
      }
    },
  }

  var kyloSith = {
    "Name": "Kylo Ren",
    "HP": 25,
    "attacks": ["Reckless Swing", "Counter"],
    "kyloInfo": "A fallen student",
    "isStunned": false,
    "hasAttacked": false,
    "isCounter": false,
    "recklessSwing": function() {
      var target = Math.floor(Math.random() * 2)
      var dmg = Math.floor(Math.random() * 6) + 3
      if (target > 0) {
        reyJedi.HP = reyJedi.HP - dmg
        kyloSith.HP = kyloSith.HP - Math.floor(dmg / 2)
        kyloSith.hasAttacked = true
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
        $("#lukeHP").text("HP:" + lukeJedi.HP + "/30")
      }
      else {
        lukeJedi.HP = lukeJedi.HP - dmg
        kyloSith.HP = kyloSith.HP - Math.floor(dmg / 2)
        kyloSith.hasAttacked = true
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
        $("#lukeHP").text("HP:" + lukeJedi.HP + "/30")
      }
    },
    "counter": function(){
      kyloSith.isCounter = true
      kyloSith.hasAttacked = true
      $(".kyloText").text("Countering")
    }
  }


// Rey
$("#reyButton").on("click", function(){
  $("#reyCard").removeClass("mx-auto").addClass("float-left")
  $("#reyAttacks").removeClass("d-none").addClass("d-block")
});

$("#reyAttacksClose").on("click", function() {
  $("#reyCard").removeClass("float-left").addClass("mx-auto")
  $("#reyAttacks").removeClass("d-block").addClass("d-none")
  $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
});

$(".reyAttack").hover(function() {
  $(".reyText").text(reyJedi.attacksInfo[$(this).attr("value")])
}, function() {
  $(".reyText").text(reyJedi.reyInfo)
})

$(".staffSwipe").on("click", function(){
  $("#reyTargets").removeClass("d-none").addClass("d-block staffSwipe")
});

$(".forcePush").on("click", function(){
  $("#reyTargets").removeClass("d-none").addClass("d-block forcePush")
});

$(".reyVader").on("click", function(){
  if ($("#reyTargets").hasClass("staffSwipe")) {
    reyJedi.staffSwipe(vaderSith)
    $("#reyCard").removeClass("float-left").addClass("mx-auto")
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
  else if ($("#reyTargets").hasClass("forcePush")) {
    reyJedi.forcePush(vaderSith)
    $("#reyCard").removeClass("float-left").addClass("mx-auto")
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
})

$(".reyKylo").on("click", function(){
  if ($("#reyTargets").hasClass("staffSwipe")) {
    reyJedi.staffSwipe(kyloSith)
    $("#reyCard").removeClass("float-left").addClass("mx-auto")
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
  else if ($("#reyTargets").hasClass("forcePush")) {
    reyJedi.forcePush(kyloSith)
    $("#reyCard").removeClass("float-left").addClass("mx-auto")
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
})


$("#reyHP").text("HP: " + reyJedi.HP + "/15")

// Luke
$("#lukeButton").on("click", function(){
  $("#lukeCard").removeClass("mx-auto").addClass("float-right")
  $("#lukeAttack").removeClass("d-none").addClass("d-block")
});

$("#lukeAttacksClose").on("click", function() {
  $("#lukeCard").removeClass("float-right").addClass("mx-auto")
  $("#lukeAttack").removeClass("d-block").addClass("d-none")
  $("#lukeTargets").removeClass("d-block").addClass("d-none")

});

$(".lukeAttack").hover(function() {
  $(".lukeText").text(lukeJedi.attacksInfo[$(this).attr("value")])
}, function() {
  $(".lukeText").text(lukeJedi.lukeInfo)
})

$(".saberAssault").on("click", function(){
  $("#lukeTargets").removeClass("d-none").addClass("d-block saberAssault")
});

$(".focus").on("click", function(){
  lukeJedi.focus()
  $("#lukeCard").removeClass("float-right").addClass("mx-auto")
  $("#lukeAttack").removeClass("d-block").addClass("d-none")
  $("#lukeTargets").removeClass("d-block saberAssault focus").addClass("d-none")
});

$(".lukeVader").on("click", function(){
  if ($("#lukeTargets").hasClass("saberAssault")) {
    lukeJedi.saberAssault(vaderSith)
    $("#lukeCard").removeClass("float-right").addClass("mx-auto")
    $("#lukeAttack").removeClass("d-block").addClass("d-none")
    $("#lukeTargets").removeClass("d-block saberAssault focus").addClass("d-none")
  }
})

$(".lukeKylo").on("click", function(){
  if ($("#lukeTargets").hasClass("saberAssault")) {
    lukeJedi.saberAssault(kyloSith)
    $("#lukeCard").removeClass("float-right").addClass("mx-auto")
    $("#lukeAttack").removeClass("d-block").addClass("d-none")
    $("#lukeTargets").removeClass("d-block saberAssault focus").addClass("d-none")
  }
})













$("#lukeHP").text("HP: " + lukeJedi.HP + "/30")



// Vader
$("#vaderHP").text("HP: " + vaderSith.HP + "/40")






// Kylo
$("#kyloHP").text("HP: " + kyloSith.HP + "/25")



// Game Functions

function gameTurnCheck () {
  if (reyJedi.hasAttacked) {
    $("#reyButton").prop("disabled", true)
  }
  if (lukeJedi.hasAttacked) {
    $("#lukeButton").prop("disabled", true)
  }
  if (reyJedi.hasAttacked && lukeJedi.hasAttacked) {
    alert("Enemy turn!")
    enemyTurn()
    resetTurn()
  }
}

function resetTurn() {
  reyJedi.hasAttacked = false
  $("#reyButton").prop("disabled", false)
  lukeJedi.hasAttacked = false
  $("#lukeButton").prop("disabled", false)
}

function resetEnemy(){
  vaderSith.hasAttacked = false
  kyloSith.hasAttacked = false
  kyloSith.isCounter = false
  $(".kyloText").text(kyloSith.kyloInfo)
}

function enemyTurn() {
  var vaderAttack = Math.floor(Math.random() * 2)
  var kyloAttack = Math.floor(Math.random() * 2)
  resetEnemy()
  if (vaderAttack > 0) {
    alert("Vader used Force Lighting!")
    vaderSith.forceLightning()
  }
  else {
    alert("Vader used Force Choke!")
    vaderSith.forceChoke()
  }
  if (kyloAttack > 0) {
    alert("Kylo used Reckless Swing!")
    kyloSith.recklessSwing()
  }
  else {
    alert("Kylo used Counter!")
    kyloSith.counter()
  }
}




});
