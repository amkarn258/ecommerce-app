import React, {useContext, useState, useEffect} from "react";
import { StyleSheet, View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { CartContext } from "../AppNavigator.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from 'react-native-swiper';

const ProductDetails = ({ route, navigation }) => {
  
  const { productId } = route.params;
  const { cart, addToCart, updateFavs, favs } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const checkIsFav = () => {
    if (!favs || !favs.includes(productId)) {
      return false;
    }
    else {
      return true;
    }
  }

  const handleUpdateFavs = () => {
    updateFavs(productId);
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const goToCart = () => {
    navigation.navigate('Cart', {productId}); 
  };

  const goToHome = () => {
    navigation.navigate('Home');
  }

  const renderPagination = (index, total, context) => {
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, left: 10 }}>
        {product.images.map((image, i) => (
          <TouchableOpacity
            key={i}
            style={{
              width: 19,
              height: 4,
              margin: 3,
              backgroundColor: index === i ? '#F9B023' : '#E4E4E4', 
            }}
            onPress={() => context.goTo(i)}
          />
        ))}
      </View>
    );
  };

  return product ? (
    <ScrollView style={{flex:1}}>
    <View style={styles.topBar}>

      <TouchableOpacity onPress={() => goToHome()} style={styles.buttonContainer}>
        <Image
          style={styles.topBarIconChild}
          resizeMode="cover"
          source={require("../assets/group-82.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goToCart()} style={styles.buttonContainer}>
      <View style={styles.cart}>
        <View style={styles.bagItem}>
          <Image
            style={styles.bagIcon}
            resizeMode="cover"
            source={require("../assets/bag.png")}
          />
        </View>
        <View style={styles.bagItem}>
          <ImageBackground
            style={styles.groupChild}
            resizeMode="cover"
            source={require("../assets/ellipse-3.png")}
          >
            <Text style={styles.text2}>{cart.length}</Text>
            </ImageBackground>
        </View>
      </View>
      </TouchableOpacity>
    </View>

      <Text style={[styles.title, styles.titleClr]}>
        <Text style={styles.product_brand}>{product.brand}</Text>
        {"\n"}
        <Text style={styles.product_title}>{product.title}</Text>
      </Text>
      
      
      <View style={[styles.reviewIcon, styles.kgParentFlexBox]}>
        <Image
          style={styles.reviewIconChild}
          resizeMode="cover"
          source={require("../assets/group-74.png")}
        />
      </View>
      <View style={styles.container}>
        <Swiper style={styles.wrapper} renderPagination={renderPagination} horizontal={true}>
          {product.images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image
                style={styles.productImageAndIcon}
                resizeMode="cover"
                source={{ uri: image }}
              />
              <TouchableOpacity onPress={handleUpdateFavs} style={styles.favoriteIcon}>
                <Image
                  style={styles.favoriteButton}
                  source={
                    checkIsFav(productId)
                    ? require('../assets/vector.png') 
                    : require('../assets/vector1.png')
                  }
                />
              </TouchableOpacity>
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.priceText}>
        <View style={[styles.kgParent, styles.kgParentFlexBox]}>
          <Text style={[styles.kg, styles.kgClr]}>
            <Text style={styles.text1}>${product.price}</Text>
          </Text>
          <View style={[styles.offWrapper, styles.kgParentFlexBox]}>
            <Text style={styles.off}>${((product.discountPercentage * product.price) / 100).toFixed(2)} OFF</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.button}>
        <TouchableOpacity onPress={handleAddToCart}>
          <View style={[styles.buttonLayout]}>
            <View style={[styles.buttonLayout]}>
              <View style={[styles.bg1, styles.buttonLayout]} />
              <Text style={[styles.button_buy_add, styles.text1Typo]}>Add to Cart</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.buttonLayout]}>
          <View style={[styles.buttonLayout]}>
            <View style={[styles.bg, styles.buttonLayout]} />
            <Text style={[styles.button_buy_add, styles.text2Typo]}>Buy Now</Text>
          </View>
        </View>
      </View>

      <View style={styles.text}>
        <Text style={[styles.details, styles.titleClr]}>Details</Text>
        <Text style={[styles.praesentCommodoCursus, styles.kgLayout]}>
          {product.description}
        </Text>
      </View>
    
    </ScrollView>
  ): null;
};

const styles = StyleSheet.create({
  titleClr: {
    color: Color.greyScaleBlack,
    textAlign: "left",
  },
  kgLayout: {
    lineHeight: 24,
    fontSize: FontSize.bodyRegular16_size,
  },
  buttonLayout: {
    width: 169,
    height: 56,
  },
  text2Typo: {
    color: Color.colorWhite,
    textAlign: "center",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
  },
  text1Typo: {
    color: Color.primaryLightBlue,
    textAlign: "center",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
  },
  kgClr: {
    color: Color.primaryLightBlue,
    textAlign: "center",
  },
  kgParentFlexBox: {
    alignItems: "left",
    flexDirection: "row",
  },
  details: {
    textAlign: "left",
    fontFamily: FontFamily.body02Regular14,
    lineHeight: 24,
    fontSize: FontSize.bodyRegular16_size,
  },
  praesentCommodoCursus: {
    color: Color.greyScaleBlack03,
    width: 327,
    marginTop: 6,
    textAlign: "left",
    fontFamily: FontFamily.body02Regular14,
  },
  text: {
    left: 24,
  },
  bg: {
    backgroundColor: Color.primaryLightBlue,
    borderRadius: Border.br_xl,
    left: 0,
  },
  button_buy_add: {
    left: 55,
    textAlign: "center",
    top: 19,
    color: Color.colorWhite,
    position: "absolute",
  },
  bg1: {
    borderStyle: "solid",
    borderColor: Color.primaryLightBlue,
    borderWidth: 1,
    borderRadius: Border.br_xl,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10
  },
  text1: {
    fontWeight: "700",
    fontFamily: FontFamily.manropeBold,
  },
  kg: {
    lineHeight: 24,
    fontSize: FontSize.bodyRegular16_size,
  },
  off: {
    fontSize: FontSize.labelRegular12_size,
    letterSpacing: 0.2,
    lineHeight: 16,
    color: Color.greyScaleBlack06,
    textAlign: "center",
    fontFamily: FontFamily.body02Regular14,
  },
  offWrapper: {
    borderRadius: 70,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 14,
    backgroundColor: Color.primaryLightBlue,
  },
  kgParent: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  priceText: {
    width: 178,
    height: 24,
    left: 20,
  },
  productImageAndIcon: {
    width: 320,
    height: 173,
  },
  reviewIconChild: {
    width: 101,
    height: 17,
  },
  reviews: {
    lineHeight: 20,
    color: "#a0a0ab",
    marginLeft: 5,
    textAlign: "center",
    fontSize: FontSize.body02Regular14_size,
    fontFamily: FontFamily.body02Regular14,
  },
  reviewIcon: {
    left: 26,
  },
  product_brand: {
    fontWeight: "300",
    fontFamily: FontFamily.manropeLight,
  },
  product_title: {
    fontWeight: "800",
    fontFamily: FontFamily.manropeExtraBold
  },
  title: {
    fontSize: 50,
    width: 306,
    left: 20,
    textAlign: "left",
  },
  bagIcon: {
    left: 3,
    width: 18,
    height: 20,
  },
  groupChild: {
    top: 0,
    left: 0,
  },
  text2: {
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
  },
  cart: {
    top: 10,
    left: 315,
  },
  topBarIconChild: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    padding: 5,
  },
  cart: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: "hidden"
  },
  bagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: "visible"
  },
  favoriteIcon: {
    top: -150,
    left: 150,
    width: 30, 
    height: 30,
  },
  favoriteButton: {
    width: 30, 
    height: 30,
  },
});

export default ProductDetails;
