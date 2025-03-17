import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ backgroundColor, title, content, quantity }) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.circle}>
          <Text style={styles.quantity}>{quantity ?? 0}</Text> 
        </View>
      </View>
      {content ? <Text>{content}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 40,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',

  },
  quantity: {
    color: '#000',
    fontWeight: 'bold',
    
  },
});

export default Card;
