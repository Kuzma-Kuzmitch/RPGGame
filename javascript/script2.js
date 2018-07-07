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
      if (target.isCounter) {
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
      if (target === vaderSith) {
        $(".vaderStatus").text("Stunned")
      }
      else if (target === kyloSith) {
        $(".kyloStatus").text("Stunned")
      }
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
        $(".lukeStatus").text("")
      }
      if (kyloSith.isCounter && target === kyloSith) {
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
      $(".lukeStatus").text("Focused")
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
    "wasStunned": false,
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
          $(".reyStatus").text("Stunned")
        }
        else {
          alert("Rey is not stunned!")
        }
      }
      else {
        if (!lukeJedi.isStunned && !lukeJedi.wasStunned) {
          lukeJedi.isStunned = true
          vaderSith.hasAttacked = true
          alert("Luke is stunned!")
          $(".lukeStatus").text("Stunned")
        }
        else {
          alert("Luke is not stunned!")
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
    "wasStunned": false,
    "hasAttacked": false,
    "isCounter": false,
    "recklessSwing": function() {
      var target = Math.floor(Math.random() * 2)
      var dmg = Math.floor(Math.random() * 6) + 3
      if (target > 0) {
        reyJedi.HP = reyJedi.HP - dmg
        kyloSith.HP = kyloSith.HP - Math.floor(dmg / 2)
        kyloSith.hasAttacked = true
        $("#kyloHP").text("HP:" + kyloSith.HP + "/25")
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
        $("#lukeHP").text("HP:" + lukeJedi.HP + "/30")
      }
      else {
        lukeJedi.HP = lukeJedi.HP - dmg
        kyloSith.HP = kyloSith.HP - Math.floor(dmg / 2)
        kyloSith.hasAttacked = true
        $("#kyloHP").text("HP:" + kyloSith.HP + "/25")
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
        $("#lukeHP").text("HP:" + lukeJedi.HP + "/30")
      }
    },
    "counter": function(){
      kyloSith.isCounter = true
      kyloSith.hasAttacked = true
      $(".kyloStatus").text("Countering")
    }
  }


// Rey
$("#reyButton").on("click", function(){
  $("#reyAttacks").removeClass("d-none").addClass("d-block")
});

$("#reyAttacksClose").on("click", function() {
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
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
  else if ($("#reyTargets").hasClass("forcePush")) {
    reyJedi.forcePush(vaderSith)
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
})

$(".reyKylo").on("click", function(){
  if ($("#reyTargets").hasClass("staffSwipe")) {
    reyJedi.staffSwipe(kyloSith)
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
  else if ($("#reyTargets").hasClass("forcePush")) {
    reyJedi.forcePush(kyloSith)
    $("#reyAttacks").removeClass("d-block").addClass("d-none")
    $("#reyTargets").removeClass("d-block staffSwipe forcePush").addClass("d-none")
  }
})


$("#reyHP").text("HP: " + reyJedi.HP + "/15")

// Luke
$("#lukeButton").on("click", function(){
  $("#lukeAttack").removeClass("d-none").addClass("d-block")
});

$("#lukeAttacksClose").on("click", function() {
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

$(".lukeFocus").on("click", function(){
  lukeJedi.focus()
  $("#lukeAttack").removeClass("d-block").addClass("d-none")
  $("#lukeTargets").removeClass("d-block saberAssault focus").addClass("d-none")
});

$(".lukeVader").on("click", function(){
  if ($("#lukeTargets").hasClass("saberAssault")) {
    lukeJedi.saberAssault(vaderSith)
    $("#lukeAttack").removeClass("d-block").addClass("d-none")
    $("#lukeTargets").removeClass("d-block saberAssault focus").addClass("d-none")
  }
})

$(".lukeKylo").on("click", function(){
  if ($("#lukeTargets").hasClass("saberAssault")) {
    lukeJedi.saberAssault(kyloSith)
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
    setTimeout(function(){alert("Enemy turn!"); }, 500);
    setTimeout(function() {enemyTurn(); resetTurn();}, 500);
    // setTimeout(function(){alert("Your turn!"); }, 500);
    // setTimeout(function(){resetTurn(); }, 500);
    // resetTurn()
  }
}

function resetTurn() {
  reyJedi.hasAttacked = false
  $("#reyButton").prop("disabled", false)
  lukeJedi.hasAttacked = false
  $("#lukeButton").prop("disabled", false)
  if (lukeJedi.isStunned) {
    lukeJedi.isStunned = false
    lukeJedi.wasStunned = true
    lukeJedi.hasAttacked = true
    $("#lukeButton").prop("disabled", true)
  }
  else if (!lukeJedi.isStunned && lukeJedi.wasStunned) {
    lukeJedi.wasStunned = false
    $(".lukeStatus").text("")
  }
  if (reyJedi.isStunned) {
    reyJedi.isStunned = false
    reyJedi.wasStunned = true
    reyJedi.hasAttacked = true
    $("#reyButton").prop("disabled", true)
  }
  else if (!reyJedi.isStunned && reyJedi.wasStunned) {
    reyJedi.wasStunned = false
    $(".reyStatus").text("")
  }
}

function resetEnemy(){
  vaderSith.hasAttacked = false
  kyloSith.hasAttacked = false
  kyloSith.isCounter = false
}

function enemyTurn() {
  resetEnemy()
  if (vaderSith.isStunned) {
    alert("Vader can't attack!")
    vaderSith.isStunned = false
    vaderSith.wasStunned = true
  }
  else {
    vaderTurn()
    vaderSith.wasStunned = false
    $(".vaderStatus").text("")
  }
  if (kyloSith.isStunned) {
    alert("Kylo can't Attack!")
    kyloSith.isStunned = false
    kyloSith.wasStunned = true
  }
  else {
    kyloTurn()
    kyloSith.wasStunned = false
  }
}

function vaderTurn() {
  var vaderAttack = Math.floor(Math.random() * 2)
  if (vaderAttack > 0) {
    alert("Vader used Force Lighting!")
    vaderSith.forceLightning()
  }
  else {
    alert("Vader used Force Choke!")
    vaderSith.forceChoke()
  }
}

function kyloTurn() {
  var kyloAttack = Math.floor(Math.random() * 2)
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
