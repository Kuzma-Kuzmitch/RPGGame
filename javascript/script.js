$(document).ready(function() {

// Variable Declaration
  var reyJedi = {
    "HP": 15,
    "attacks": ["Staff Swipe", "Force Push"],
    "attacksInfo": ["A quick, nimble strike: 2-4 DMG", "Classic Force attack: Stun 1 turn."],
    "reyInfo": "A young apprentice",
    "hasAttacked": false,
    "isStunned": false,
    "staffSwipe": function(target) {
      var dmg = Math.floor(Math.random() * 2) + 2
      target.HP = target.HP - dmg
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
    "isFocus": false,
    "saberAssault": function(target) {
      var dmg = Math.floor(Math.random() * 2) + 6
      if (lukeJedi.isFocus) {
        dmg = dmg * 2
        lukeJedi.isFocus = false
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
    }
  }

  var kyloSith = {
    "Name": "Kylo Ren",
    "HP": 25,
    "attacks": ["Reckless Swipe", "Counter"],
    "kyloInfo": "A fallen student"
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

function enemyTurn() {
  
}




});
