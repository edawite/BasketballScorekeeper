import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";

export default function App() {
  const [team1, setTeam1] = useState(
    Array(5).fill().map(() => ({
      name: "",
      pts: 0,
      reb: 0,
      ast: 0,
      stl: 0,
      blk: 0,
      fgm: 0,
      fga: 0,
    }))
  );

  const [team2, setTeam2] = useState(
    Array(5).fill().map(() => ({
      name: "",
      pts: 0,
      reb: 0,
      ast: 0,
      stl: 0,
      blk: 0,
      fgm: 0,
      fga: 0,
    }))
  );

  const resetStats = () => {
    setTeam1(
      Array(5).fill().map(() => ({
        name: "",
        pts: 0,
        reb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        fgm: 0,
        fga: 0,
      }))
    );
    setTeam2(
      Array(5).fill().map(() => ({
        name: "",
        pts: 0,
        reb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        fgm: 0,
        fga: 0,
      }))
    );
  };

  const updateStat = (team, index, stat, increment) => {
    if (team === "team1") {
      setTeam1((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[index][stat] += increment;
        if (updatedPlayers[index][stat] < 0) updatedPlayers[index][stat] = 0;
        if (stat === "fgm" && increment > 0) {
          updatedPlayers[index]["fga"] += 1;
        }
        return updatedPlayers;
      });
    } else if (team === "team2") {
      setTeam2((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[index][stat] += increment;
        if (updatedPlayers[index][stat] < 0) updatedPlayers[index][stat] = 0;
        if (stat === "fgm" && increment > 0) {
          updatedPlayers[index]["fga"] += 1;
        }
        return updatedPlayers;
      });
    }
  };

  const team1Total = team1.reduce((sum, player) => sum + player.pts, 0);
  const team2Total = team2.reduce((sum, player) => sum + player.pts, 0);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Team 1 on Left */}
        <View style={styles.leftSide}>
          <Text style={styles.teamLabel}>Team 1: {team1Total}</Text>
          <ScrollView>
            {team1.map((player, index) => (
              <View key={index} style={styles.playerCard}>
                <TextInput
                  style={styles.nameInput}
                  placeholder={`Player ${index + 1}`}
                  value={player.name}
                  onChangeText={(text) =>
                    setTeam1((prevPlayers) => {
                      const updatedPlayers = [...prevPlayers];
                      updatedPlayers[index].name = text;
                      return updatedPlayers;
                    })
                  }
                />
                {["pts", "reb", "ast", "stl", "blk", "fgm", "fga"].map((stat) => (
                  <View key={stat} style={styles.statRow}>
                    <Text style={styles.statLabel}>{stat.toUpperCase()}:{player[stat]}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => updateStat("team1", index, stat, 1)}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => updateStat("team1", index, stat, -1)}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Team 2 on Right */}
        <View style={styles.rightSide}>
          <Text style={styles.teamLabel}>Team 2: {team2Total}</Text>
          <ScrollView>
            {team2.map((player, index) => (
              <View key={index} style={styles.playerCard}>
                <TextInput
                  style={styles.nameInput}
                  placeholder={`Player ${index + 6}`}
                  value={player.name}
                  onChangeText={(text) =>
                    setTeam2((prevPlayers) => {
                      const updatedPlayers = [...prevPlayers];
                      updatedPlayers[index].name = text;
                      return updatedPlayers;
                    })
                  }
                />
                {["pts", "reb", "ast", "stl", "blk", "fgm", "fga"].map((stat) => (
                  <View key={stat} style={styles.statRow}>
                    <Text style={styles.statLabel}>{stat.toUpperCase()}:{player[stat]}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => updateStat("team2", index, stat, 1)}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => updateStat("team2", index, stat, -1)}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetStats}>
        <Text style={styles.resetButtonText}>Reset All Stats</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
  },
  leftSide: {
    flex: 1,
    paddingRight: 10,
  },
  divider: {
    width: 2,
    backgroundColor: "#00008B",
  },
  rightSide: {
    flex: 1,
    paddingLeft: 10,
  },
  teamLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00008B",
    marginBottom: 15,
  },
  playerCard: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  nameInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    textAlign: "center",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    flex: 3,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#00008B",
    padding: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#8B0000",
    padding: 18,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
