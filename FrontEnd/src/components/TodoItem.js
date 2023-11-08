import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";

export default function TodoItem(props) {
  const [isSelected, setSelection] = useState(props.isSelected);

  const [iconColor, setIconColor] = useState("red");
  const [disableRemove, setDisableRemove] = useState(false);

  const TitleStyles = {
    textDecorationLine: isSelected ? "line-through" : "none",
  };

  return (
    <View style={styles.todoItem}>
      <View style={styles.checkBoxAndText}>
        <Checkbox
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => {
            try {
              props.onChangeCheckBox(props.index);
              setSelection(!isSelected);
            } catch (error) {
              setSelection(isSelected);
            }
          }}
          style={styles.checkbox}
        />
        <Text style={[styles.Title, TitleStyles]}>{props.Todo}</Text>
      </View>

      <Icon
        disabled={disableRemove}
        name="times"
        size={20}
        color={iconColor}
        onPress={() => {
          setDisableRemove(true);
          setIconColor("white");
          try {
            props.onDelete(props.index);
          } catch (error) {
            setDisableRemove(false);
            setIconColor("red");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  checkBoxAndText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  Title: {
    maxWidth: 200,
    padding: 5,
  },
});
