import React, {useContext} from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { CartContext } from "../AppNavigator";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const ShoppingCart2 = ({route, navigation}) => {
  const productId = route.params.productId;
  const { cart, updateCartItemQuantity } = useContext(CartContext);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const goToHome = () => {
    navigation.navigate('Home');
  }

  const goBack = () => {
    if (!productId) {
      goToHome();
    }
    else {navigation.navigate('ProductDetails', {productId});}
  }

  return (
    <ScrollView>
    <View style={styles.shoppingCart2}>
      
      <View style={[styles.topBar, styles.topBarLayout]}>
      <TouchableOpacity onPress={goBack}>
        <Image
          style={[styles.plusMinusButtonItem, styles.plusLayout]}
          resizeMode="cover"
          source={require("../assets/group-82.png")}
        />
        
      </TouchableOpacity>
        <Text style={styles.shoppingCart5}>
          {`Shopping Cart (${cart.length})`}
        </Text>
      </View>
      <View style={styles.card01}>
      <FlatList 
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
         return (
          <View style={styles.cardLayout}>
            <Text style={[styles.package02, styles.text5Position]}>{item.title}</Text>
            <Text style={[styles.text5, styles.text5Position]}>${item.price}</Text>
            <View style={[styles.plusMinusButton, styles.topBarLayout]}>
              <Text style={[styles.text6, styles.textTypo1]}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
              <Image
                style={[styles.plusMinusButtonChild, styles.plusLayout]}
                resizeMode="cover"
                source={require("../assets/group-37749.png")}
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
              <View>
              <Image
                style={[styles.plusMinusButtonItem, styles.plusLayout]}
                resizeMode="cover"
                source={require("../assets/group-37750.png")}
              />
              </View>
              </TouchableOpacity>
            </View>
            <Image
              style={[styles.imageIcon, styles.imageIconLayout]}
              resizeMode="cover"
              source={{ uri: item.thumbnail }} 
            />
          </View>
         )
      }}
      />
      </View>
      
      <View style={[styles.textbgButton, styles.textbgLayout]}>
        <View style={[styles.textbgButtonChild, styles.textbgLayout]} />
        <Text style={[styles.subtotal, styles.totalPosition]}>Subtotal</Text>
        <Text style={[styles.text1, styles.textTypo1]}>${calculateTotalAmount().toFixed(2)}</Text>
        <Text style={[styles.delivery, styles.totalPosition]}>Delivery</Text>
        <Text style={[styles.total, styles.totalPosition]}>Total</Text>
        <Text style={[styles.text2, styles.textTypo1]}>$0</Text>
        <Text style={[styles.text3, styles.textTypo]}>${calculateTotalAmount().toFixed(2)}</Text>
        <View style={[styles.button, styles.bgLayout]}>
          <View style={[styles.bg, styles.bgLayout]} />
          <Text style={[styles.buttonText, styles.textTypo]}>
            Proceed To checkout
          </Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textTypo1: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
  },
  imageIconLayout: {
    opacity: 0.6,
    height: 30,
    width: 30,
    top: 4,
    position: "absolute",
    overflow: "hidden",
  },
  textbgLayout: {
    height: 266,
    width: 359,
    position: "absolute",
  },
  totalPosition: {
    color: Color.greyScaleBlack02,
    left: 36,
    fontFamily: FontFamily.body02Regular14,
    lineHeight: 20,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  bgLayout: {
    height: 56,
    width: 327,
    position: "absolute",
  },
  cardLayout: {
    height: 42,
    width: 325,
    left: 30,
    top: 10,
    marginBottom: 25,
  },
  text5Position: {
    left: 56,
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  topBarLayout: {
    height: 40,
    position: "absolute",
  },
  plusLayout: {
    width: 40,
    height: 40,
    top: 0,
    position: "absolute",
  },
  text: {
    fontFamily: FontFamily.body02Regular14,
    lineHeight: 20,
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
    left: 62,
  },
  textbgButtonChild: {
    borderRadius: 30,
    backgroundColor: Color.greyScaleBlack05,
    top: 0,
    left: 0,
  },
  subtotal: {
    textAlign: "center",
    top: 17,
  },
  text1: {
    left: 277,
    textAlign: "right",
    top: 17,
    lineHeight: 20,
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  delivery: {
    top: 50,
    textAlign: "left",
  },
  total: {
    top: 86,
    textAlign: "left",
  },
  text2: {
    top: 51,
    left: 285,
    textAlign: "right",
    lineHeight: 20,
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  text3: {
    top: 87,
    left: 278,
    textAlign: "right",
    lineHeight: 20,
    color: Color.greyScaleBlack,
  },
  bg: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.primaryLightBlue,
    top: 0,
    left: 0,
  },
  buttonText: {
    top: 19,
    left: 92,
    color: Color.colorWhite,
    textAlign: "center",
  },
  button: {
    top: 141,
    left: 16,
  },
  textbgButton: {
    top: 584,
    left: 8,
  },
  package02: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
    top: 0,
  },
  text5: {
    fontFamily: FontFamily.body02Regular14,
    lineHeight: 20,
    top: 22,
  },
  text6: {
    top: 11,
    left: 51,
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  plusMinusButtonChild: {
    left: 70,
  },
  plusMinusButtonItem: {
    left: 0,
  },
  plusMinusButton: {
    top: 2,
    left: 215,
    width: 110,
    height: 40,
  },
  imageIcon: {
    left: 0,
  },
  card01: {
    top: 66,
    justifyContent: "space-between",
  },
  shoppingCart5: {
    top: 8,
    left: 61,
    fontSize: FontSize.bodyRegular16_size,
    lineHeight: 24,
    width: 143,
    textAlign: "center",
    fontFamily: FontFamily.body02Regular14,
    color: Color.greyScaleBlack,
    position: "absolute",
  },
  topBar: {
    top: 20,
    width: 204,
    left: 24,
  },
  shoppingCart2: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default ShoppingCart2;
