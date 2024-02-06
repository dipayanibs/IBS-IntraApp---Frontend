import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions,TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import config from '../config';




const FullViewScreen = () => {

    useEffect(() => {
        const disableHeader = () => {
          navigation.setOptions({
            headerShown: false,
          });
        };
    
        disableHeader();
    
        return () => {
          navigation.setOptions({
            headerShown: true,
          });
        };
      }, [navigation]);

    const route = useRoute();
    const item = route.params?.item;
    const navigation = useNavigation();
    const apiBaseUrlImage = config.API_BASE_URL_IMAGE;

  if (!item) {
    return <View style={styles.errorContainer}><Text>Item not found</Text></View>;
  }

const getSplData = (item) => {
  // Check if the item is an event or news and extract data accordingly
  if (item.events) {
    // Handling events
    return {
      image: item.events.image, // assuming image can be null as per your JSON
      date: item.events.start_Date, // using start_Date as the date
      title: item.events.title,
      description: item.events.description,
      link: null, // There's no link in the events structure you provided
    };
  } else if (item.news) {
    // Handling news
    return {
      image: item.news.image,
      date: item.news.p_Date, // using p_Date as the date for news
      title: item.news.title,
      description: item.news.description,
      link: item.news.link, // link can be null as per your JSON
    };
  }
}

  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  
  const item2 = getSplData(item);
  return (
    <ScrollView style={styles.container}>
      <Image source={ item2.image  ? { uri: apiBaseUrlImage+`/${item2.image}` } : require('../assets/paper.webp') } style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.dateText}>{formatDateAndTime(item2.date)}</Text>
        <Text style={styles.title}>{item2.title}</Text>
        <Text style={styles.description}>{item2.description}</Text>
        <TouchableOpacity onPress={() => handleLinkPress(item)}>
            <Text style={styles.link}>{item.link}</Text>
        </TouchableOpacity>
        {/* {item.link && (
          <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>Read More</Text>
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:45,
    },
  image: {
    width: Dimensions.get('window').width, // Full width
    height: 200, // Fixed height, can be adjusted
  },
  content: {
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'none',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullViewScreen;
