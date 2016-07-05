PlayersList = new Mongo.Collection('players');
if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			return PlayersList.find({},{sort:{score:-1, name:1	}});
		},
		'numplayers': function(){
			return PlayersList.find().count();
		},
		'selectedClass': function(){
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
			if(playerId==selectedPlayer){
				return "selected";
			}
		},
		'selectedPlayer':function(){
			var selectedPlayer=Session.get('selectedPlayer');
			return PlayersList.findOne({_id: selectedPlayer});
		}
	});
	Session.set('selectedPlayer', 'session value test');
	Template.leaderboard.events({
		'click .player': function(){
			var playerId = this._id;
			Session.set('selectedPlayer', playerId);
			//var selectedPlayer = Session.get('selectedPlayer');
			//console.log(selectedPlayer);
		},
		'click .increment':function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update({ _id: selectedPlayer},{$inc:{score:5}});
		},
		'click .decrement': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update({_id: selectedPlayer},{$inc:{score:-5}});
		},
		'click .remove':function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.remove({_id:selectedPlayer});
		},
	});
	Template.addPlayerForm.events({
		'submit form': function(event){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			//console.log(playerNameVar);
			event.target.playerName.value="";
			PlayersList.insert({
				name:playerNameVar,
				score:0
			});
		}

	});
}

//yay git
