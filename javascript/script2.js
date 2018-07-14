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
    "isDead": false,
    "staffSwipe": function(target) {
      var dmg = Math.floor(Math.random() * 2) + 2
      target.HP = target.HP - dmg
      if (target.isCounter) {
        alert("Kylo strikes back for " + Math.floor(dmg / 2) + " damage!")
        reyJedi.HP = reyJedi.HP - Math.floor(dmg / 2)
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
      }
      reyJedi.hasAttacked = true
      enemyStateCheck()
      $("#vaderHP").text("HP: " + vaderSith.HP + "/40")
      $("#kyloHP").text("HP: " + kyloSith.HP + "/25")
      // enemyStateCheck()
      gameTurnCheck()
    },
    "forcePush": function(target) {
      if (target.wasStunned) {
        alert("It failed!")
        reyJedi.hasAttacked = true
        enemyStateCheck()
        gameTurnCheck()
      }
      else {
        target.isStunned = true
        alert(target.Name + " is stunned!");
        if (target === vaderSith) {
          $(".vaderStatus").text("Stunned")
        }
        else if (target === kyloSith) {
          $(".kyloStatus").text("Stunned")
        }
        reyJedi.hasAttacked = true
        enemyStateCheck()
        gameTurnCheck()
      }
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
    "isDead": false,
    "saberAssault": function(target) {
      var dmg = Math.floor(Math.random() * 2) + 6
      if (lukeJedi.isFocus) {
        dmg = dmg * 2
        lukeJedi.isFocus = false
        $(".lukeStatus").text("")
      }
      if (kyloSith.isCounter && target === kyloSith) {
        alert("Kylo strikes back for " + Math.floor(dmg / 2) + " damage!")
        lukeJedi.HP = lukeJedi.HP - Math.floor(dmg / 2)
        $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
      }
      target.HP = target.HP - dmg
      lukeJedi.hasAttacked = true
      enemyStateCheck()
      $("#vaderHP").text("HP: " + vaderSith.HP + "/40")
      $("#kyloHP").text("HP: " + kyloSith.HP + "/25")
      // enemyStateCheck()
      gameTurnCheck()
    },
    "focus": function() {
      lukeJedi.isFocus = true
      lukeJedi.hasAttacked = true
      $(".lukeStatus").text("Focused")
      enemyStateCheck()
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
    "isDead": false,
    "forceLightning": function(){
      var dmg = Math.floor(Math.random() * 2) + 2
      if (!reyJedi.isDead && !lukeJedi.isDead) {
        if (kyloSith.isDead) {
          dmg = dmg + 5
        }
        lukeJedi.HP = lukeJedi.HP - dmg
        reyJedi.HP = reyJedi.HP - dmg
        vaderSith.hasAttacked = true
        alert("Rey and Luke take " + dmg + " damage each!")
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
        $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
      }
      else if (!reyJedi.isDead && lukeJedi.isDead) {
        reyJedi.HP = reyJedi.HP - (dmg * 2)
        vaderSith.hasAttacked = true
        alert("Rey feels the power of the Dark Side! She takes " + (dmg * 2) + " damage!")
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
      }
      else if (reyJedi.isDead && !lukeJedi.isDead) {
        lukeJedi.HP = lukeJedi.HP - (dmg * 2)
        vaderSith.hasAttacked = true
        alert("Luke feels the power of the Dark Side! He takes " + (dmg * 2) + " damage!")
        $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
      }
    },
    "forceChoke": function(){
      var target = Math.floor(Math.random() * 2)
      if (target > 0 && !reyJedi.isDead) {
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
      else if (!lukeJedi.isDead) {
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
    "isDead": false,
    "recklessSwing": function() {
      var target = Math.floor(Math.random() * 2)
      var dmg = Math.floor(Math.random() * 6) + 3
      if (target > 0 && !reyJedi.isDead) {
        reyJedi.HP = reyJedi.HP - dmg
        kyloSith.HP = kyloSith.HP - Math.floor(dmg / 2)
        if (kyloSith.HP < 5) {
          alert("Kylo's anger fuels him!")
          kyloSith.HP = kyloSith.HP + 5
        }
        kyloSith.hasAttacked = true
        alert("Kylo hits Rey for " + dmg + " damage!")
        $("#kyloHP").text("HP: " + kyloSith.HP + "/25")
        $("#reyHP").text("HP: " + reyJedi.HP + "/15")
      }
      else if (target < 1 && !lukeJedi.isDead) {
        lukeJedi.HP = lukeJedi.HP - dmg
        kyloSith.HP = kyloSith.HP - Math.floor(dmg / 2)
        if (kyloSith.HP < 5) {
          alert("Kylo's anger fuels him!")
          kyloSith.HP = kyloSith.HP + 5
        }
        kyloSith.hasAttacked = true
        alert("Kylo hits Luke for " + dmg + " damage!")
        $("#kyloHP").text("HP: " + kyloSith.HP + "/25")
        $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
      }
    },
    "counter": function(){
      if (vaderSith.isDead) {
        alert("Kylo emits a wave of force lighting.")
        var dmg = Math.floor(Math.random() * 2) + 2
        if (!reyJedi.isDead && !lukeJedi.isDead) {
          lukeJedi.HP = lukeJedi.HP - dmg
          reyJedi.HP = reyJedi.HP - dmg
          vaderSith.hasAttacked = true
          alert("Rey and Luke take " + dmg + " damage each!")
          $("#reyHP").text("HP: " + reyJedi.HP + "/15")
          $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
        }
        else if (!reyJedi.isDead && lukeJedi.isDead) {
          reyJedi.HP = reyJedi.HP - (dmg * 2)
          vaderSith.hasAttacked = true
          alert("Rey feels the rage of the Kylo Ren! She takes " + (dmg * 2) + " damage!")
          $("#reyHP").text("HP: " + reyJedi.HP + "/15")
        }
        else if (reyJedi.isDead && !lukeJedi.isDead) {
          lukeJedi.HP = lukeJedi.HP - (dmg * 2)
          vaderSith.hasAttacked = true
          alert("Luke feels the rage of the Kylo Ren! He takes " + (dmg * 2) + " damage!")
          $("#lukeHP").text("HP: " + lukeJedi.HP + "/30")
        }
      }
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
    setTimeout(function() {enemyTurn(); resetTurn(); gameTurnCheck()}, 500);
  }
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
    playerStateCheck()
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
    playerStateCheck()
    kyloSith.wasStunned = false
  }
}

function resetTurn() {
  if (!reyJedi.isDead) {
    reyJedi.hasAttacked = false
    $("#reyButton").prop("disabled", false)
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
  // else {
  //   gameTurnCheck()
  // }
  if (!lukeJedi.isDead) {
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
  }
  else {
    gameTurnCheck()
  }
}

function resetEnemy(){
  vaderSith.hasAttacked = false
  kyloSith.hasAttacked = false
  if (kyloSith.isCounter) {
    kyloSith.isCounter = false
    $(".kyloStatus").text("")
  }
  if (kyloSith.isStunned) {
    $(".kyloStatus").text("")
  }
  if (vaderSith.isStunned) {
    $(".vaderStatus").text("")
  }
}


function vaderTurn() {
  if (!vaderSith.isDead) {
    var vaderAttack = Math.floor(Math.random() * 2)
    if (vaderAttack > 0) {
      alert("Vader used Force Lighting!")
      vaderSith.forceLightning()
      // playerStateCheck()
    }
    else {
      alert("Vader used Force Choke!")
      vaderSith.forceChoke()
      // playerStateCheck()
    }
  }
}

function kyloTurn() {
  if (!kyloSith.isDead) {
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
}

function playerStateCheck() {
  if (reyJedi.HP <= 0 && !reyJedi.isDead) {
    alert("Rey is defeated!")
    reyJedi.HP = 0
    $("#reyHP").text("HP: " + reyJedi.HP + "/15")
    $(".reyAbilities").css("opacity", ".5")
    reyJedi.hasAttacked = true
    reyJedi.isDead = true
    $("#reyButton").prop("disabled", true)
  }
  if (lukeJedi.HP <= 0 && !lukeJedi.isDead) {
    alert("Luke is defeated!")
    lukeJedi.HP = 0
    $(".lukeHP").text("HP: " + lukeJedi.HP + "/30")
    $(".lukeAbilities").css("opacity", ".5")
    lukeJedi.hasAttacked = true
    lukeJedi.isDead = true
    $("#lukeButton").prop("disabled", true)
  }
  if (reyJedi.isDead && lukeJedi.isDead) {
    alert("Hope falls silent...")
    window.location = "index4.html"
  }
}


function enemyStateCheck() {
  if (vaderSith.HP <= 0 && !vaderSith.isDead) {
    alert("Darth Vader is defeated!")
    vaderSith.HP = 0
    $("#vaderHP").text("HP: " + vaderSith.HP + "/40")
    $(".vaderAbilities").css("opacity", ".5")
    vaderSith.hasAttacked = true
    vaderSith.isDead = true
    $(".reyVader").prop("disabled", true)
    $(".lukeVader").prop("disabled", true)
  }
  if (kyloSith.HP <= 0 && !kyloSith.isDead) {
    alert("Kylo Ren is defeated!")
    kyloSith.HP = 0
    $(".kyloHP").text("HP: " + kyloSith.HP + "/25")
    $(".kyloAbilities").css("opacity", ".5")
    kyloSith.hasAttacked = true
    kyloSith.isDead = true
    $(".reyKylo").prop("disabled", true)
    $(".lukeKylo").prop("disabled", true)
  }
  if (vaderSith.isDead && kyloSith.isDead) {
    alert("Can it be so?")
    window.location = "index3.html"
  }
}



});
