import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity} from "react-native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { CartContext } from '../AppNavigator.js';

const GroceryHome = ({ navigation }) => {

  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useContext(CartContext);

  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products?skip=${skip}`);
      const data = await response.json();
  
      if (data && data.products && Array.isArray(data.products)) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const goToCart = () => {
    navigation.navigate('Cart', {});
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  }


  return (
    <View style={styles.groceryHome}>
      <View style={[styles.card]}>
        <FlatList data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({item}) => {
          
          return (
              <TouchableOpacity onPress={() => handleProductPress(item.id)}>
                <View style={styles.grocerycard}>
                <Image source={{ uri: item.thumbnail }} style={styles.imageIcon} resizeMode='cover' />
                <View style={[styles.grocerycardchild]}>
                  
                <Text style={[styles.product_price, styles.product_title]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.text]}>${item.price}</Text>
                  <View style={[styles.cardInner, styles.cardInnerLayout]}>
                    <View style={[styles.groupChild, styles.groupChildFlexBox]} />
                  </View>
                  <TouchableOpacity onPress={() => handleAddToCart(item)}>
                    <Image
                      style={[styles.cardItem, styles.iconLayout1]}
                      resizeMode="cover"
                      source={require("../assets/group-32.png")}
                    />
                  </TouchableOpacity>
                </View>
                </View>
              </TouchableOpacity>
          )}
          }
          onEndReached={
            () => {
              if (!loading) {
                setSkip((prevSkip) => prevSkip + 30);
              }
            }
          }
          onEndReachedThreshold={0.1}
        />
      </View>
      <View style={styles.bg} />
      <Text style={styles.title}>Recommended</Text>
      <View style={styles.bannerCard}>
        <View style={[styles.card8, styles.cardLayout]}>
          <View style={[styles.cardChild5, styles.cardChildLayout]} />
          <Text style={[styles.get, styles.getTypo]}>Get</Text>
          <Text style={[styles.onFirst03Container, styles.getPosition]}>
            <Text style={styles.getTypo}>{`On first `}</Text>
            <Text style={styles.text4Typo}>03</Text>
            <Text style={styles.getTypo}> order</Text>
          </Text>
          <Text style={[styles.off, styles.offTypo]}>50% OFF</Text>
          <Image
            style={[styles.card8, styles.cardLayout]}
            resizeMode="cover"
            source={require("../assets/mask-group.png")}
          />
        </View>
        <View style={[styles.card9, styles.cardLayout]}>
          <View style={[styles.cardChild6, styles.cardChildLayout]} />
          <Text style={[styles.get, styles.getTypo]}>Get</Text>
          <Text style={[styles.onFirst03Container, styles.getPosition]}>
            <Text style={styles.getTypo}>{`On first `}</Text>
            <Text style={styles.text4Typo}>03</Text>
            <Text style={styles.getTypo}> order</Text>
          </Text>
          <Text style={[styles.off, styles.offTypo]}>50% OFF</Text>
          <Image
            style={[styles.card8, styles.cardLayout]}
            resizeMode="cover"
            source={require("../assets/mask-group.png")}
          />
        </View>
      </View>
      <View style={[styles.text6, styles.textParentLayout]}>
        <View style={[styles.deliveryToParent, styles.textParentLayout]}>
          <Text style={[styles.deliveryTo, styles.heyRahulClr]}>
            Delivery to
          </Text>
          <View style={[styles.greenWay3000SylhetParent, styles.getPosition1]}>
            <Text style={[styles.greenWay3000, styles.heyRahulClr]}>
              Green Way 3000, Sylhet
            </Text>
            <Image
              style={styles.arrowIocnIcon}
              resizeMode="cover"
              source={require("../assets/arrow-iocn.png")}
            />
          </View>
        </View>
        <View style={[styles.textParent, styles.textParentLayout]}>
          <Text style={[styles.deliveryTo, styles.heyRahulClr]}>Within</Text>
          <View style={[styles.greenWay3000SylhetParent, styles.getPosition1]}>
            <Text style={[styles.greenWay3000, styles.heyRahulClr]}>
              1 Hour
            </Text>
            <Image
              style={styles.arrowIocnIcon}
              resizeMode="cover"
              source={require("../assets/arrow-iocn.png")}
            />
          </View>
        </View>
      </View>
      <View style={[styles.searchBar, styles.bg1Layout]}>
        <View style={[styles.bg1, styles.bg1Layout]} />
        <Image
          style={styles.searchIcon}
          resizeMode="cover"
          source={require("../assets/search-icon.png")}
        />
        <Text style={[styles.text9, styles.moreTypo]}>
          Search Products or store
        </Text>
      </View>
      <View style={styles.heyRahulParent}>
        <Text style={[styles.heyRahul, styles.heyRahulClr]}>Hey, Rahul</Text>
        <TouchableOpacity onPress={goToCart}>
        <View style={[styles.cartIcon, styles.iconLayout1]}>
          <Image
            style={styles.bagIcon}
            resizeMode="cover"
            source={require("../assets/bag1.png")}
          />
          <View style={[styles.ellipseParent, styles.iconLayout1]}>
            <Image
              style={[styles.ellipseIcon, styles.iconLayout1]}
              resizeMode="cover"
              source={require("../assets/ellipse-31.png")}
            />
            <Text style={[styles.text10, styles.moreFlexBox]}>{cart.length}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBar}>
        <Image
          style={styles.subtractIcon}
          resizeMode="cover"
          source={require("../assets/subtract.png")}
        />
        <Image
          style={[styles.homeIconAndText, styles.bg1Layout]}
          resizeMode="cover"
          source={require("../assets/home-icon-and-text.png")}
        />
        <View style={[styles.moreIconAndText, styles.iconLayout]}>
          <Text style={[styles.more, styles.moreFlexBox]}>More</Text>
          <Image
            style={[styles.menuMoreVertical, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/menu--more-vertical.png")}
          />
        </View>
        <View style={[styles.favouriteIconAndText, styles.iconLayout]}>
          <Text style={[styles.more, styles.moreFlexBox]}>Favourite</Text>
          <Image
            style={[
              styles.iconlytwoToneheart,
              styles.iconlytwoToneheartPosition,
            ]}
            resizeMode="cover"
            source={require("../assets/iconlytwotoneheart1.png")}
          />
        </View>
        <View style={[styles.categoriesIconAndText, styles.iconLayout]}>
          <Text style={[styles.more, styles.moreFlexBox]}>Categories</Text>
          <Image
            style={[
              styles.iconlycurvedcategory,
              styles.iconlytwoToneheartPosition,
            ]}
            resizeMode="cover"
            source={require("../assets/iconlycurvedcategory1.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product_title: {
    width: 112,
    color: Color.greyScaleBlack02,
    lineHeight: 16,
    fontFamily: FontFamily.body02Regular14,
    letterSpacing: 0.2,
    fontSize: FontSize.labelRegular12_size,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  cardInnerLayout: {
    height: 19,
    position: "absolute",
  },
  groupChildFlexBox: {
    alignItems: "center",
    left: 0,
  },
  iconLayout1: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  cardLayout: {
    width: 269,
    height: 123,
    position: "absolute",
  },
  cardChildLayout: {
    borderRadius: Border.br_base,
    width: 269,
    height: 123,
    left: 0,
    top: 0,
    position: "absolute",
  },
  getTypo: {
    fontFamily: FontFamily.manropeLight,
    fontWeight: "300",
  },
  getPosition: {
    left: 134,
    color: Color.colorWhite,
    textAlign: "left",
  },
  offTypo: {
    fontFamily: FontFamily.manropeExtraBold,
    fontWeight: "800",
    position: "absolute",
  },
  textParentLayout: {
    height: 38,
    position: "absolute",
  },
  heyRahulClr: {
    color: Color.greyScaleBlack05,
    textAlign: "left",
  },
  getPosition1: {
    top: 19,
    position: "absolute",
  },
  bg1Layout: {
    height: 56,
    position: "absolute",
  },
  moreTypo: {
    color: Color.greyScaleBlack03,
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
  },
  moreFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  iconLayout: {
    height: 41,
    position: "absolute",
  },
  iconlytwoToneheartPosition: {
    bottom: "41.46%",
    top: "0%",
    height: "58.54%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIconLayout: {
    bottom: "37.76%",
    top: "60.59%",
    width: "3.89%",
    height: "1.65%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  cardChild: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.greyScaleBlack05,
    left: 0,
    top: 0,
  },
  imageIcon: {
    top: 20,
    left: 43,
    width: 68,
    height: 68,
    opacity: 0.6,
    position: "absolute",
    overflow: "hidden",
    borderRadius: 12
  },
  text: {
    color: Color.greyScaleBlack,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    position: "absolute",
    top: 44,
  },
  product_price: {
    top: 68,
  },
  groupChild: {
    justifyContent: "flex-end",
    top: 0,
    position: "absolute",
  },
  cardInner: {
    width: 23,
    height: 19,
    top: 0,
  },
  cardItem: {
    left: 104,
    width: 24,
    top: 44,
  },
  card1: {
    top: 20,
    width: 160,
    height: 84,
    left: 20
  },
  card: {
    left: 5,
    top: 479,
  },
  text1: {
    top: 47,
    color: Color.greyScaleBlack,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    left: 0,
    position: "absolute",
  },
  fishh03: {
    top: 71,
  },
  groupView: {
    top: 3,
    width: 23,
    left: 14,
    height: 19,
  },
  groupIcon: {
    left: 104,
    width: 24,
    top: 0,
  },
  card3: {
    top: 87,
    height: 87,
  },
  card2: {
    top: 695,
  },
  clownfishh03: {
    top: 68,
  },
  card4: {
    top: 479,
  },
  goldFishh03: {
    top: 71,
  },
  card6: {
    top: 695,
    left: 20,
  },
  bg: {
    backgroundColor: Color.primaryLightBlue,
    width: 376,
    height: 252,
    left: 0,
    top: 0,
    position: "absolute",
  },
  title: {
    top: 429,
    fontSize: FontSize.heading01Regular30_size,
    lineHeight: 38,
    fontFamily: FontFamily.body02Regular14,
    textAlign: "left",
    color: Color.greyScaleBlack,
    left: 20,
    position: "absolute",
  },
  cardChild5: {
    backgroundColor: "#f9b023",
  },
  get: {
    fontSize: FontSize.size_xl,
    width: 34,
    height: 29,
    color: Color.colorWhite,
    left: 134,
    textAlign: "left",
    top: 19,
    position: "absolute",
  },
  text4Typo: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
  },
  onFirst03Container: {
    top: 80,
    fontSize: FontSize.size_smi,
    width: 96,
    color: Color.colorWhite,
    height: 19,
    position: "absolute",
  },
  off: {
    fontSize: FontSize.size_7xl,
    width: 114,
    height: 39,
    color: Color.colorWhite,
    left: 134,
    textAlign: "left",
    top: 44,
  },
  card8: {
    left: 0,
  },
  cardChild6: {
    backgroundColor: "#e4ddcb",
  },
  card9: {
    left: 287,
  },
  bannerCard: {
    top: 279,
    width: 556,
    height: 123,
    left: 20,
    position: "absolute",
  },
  deliveryTo: {
    fontSize: FontSize.size_2xs,
    textTransform: "uppercase",
    opacity: 0.5,
    fontFamily: FontFamily.manropeExtraBold,
    fontWeight: "800",
    position: "absolute",
    letterSpacing: 0.2,
    color: Color.greyScaleBlack05,
    left: 0,
    top: 0,
  },
  greenWay3000: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
    fontSize: FontSize.body02Regular14_size,
  },
  arrowIocnIcon: {
    width: 8,
    height: 5,
    marginLeft: 10,
  },
  greenWay3000SylhetParent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
  },
  deliveryToParent: {
    width: 174,
    left: 0,
    top: 0,
  },
  textParent: {
    left: 278,
    width: 58,
    top: 0,
  },
  text6: {
    top: 202,
    width: 336,
    left: 20,
  },
  bg1: {
    borderRadius: 28,
    backgroundColor: "#153075",
    width: 335,
    height: 56,
    left: 0,
    top: 0,
  },
  searchIcon: {
    height: "32.14%",
    width: "5.37%",
    top: "33.93%",
    right: "86.27%",
    bottom: "33.93%",
    left: "8.36%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  text9: {
    left: 58,
    top: 19,
    position: "absolute",
    textAlign: "left",
    fontSize: FontSize.body02Regular14_size,
  },
  searchBar: {
    top: 117,
    width: 335,
    height: 56,
    left: 20,
  },
  heyRahul: {
    fontSize: 22,
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    left: 0,
    top: 0,
    position: "absolute",
  },
  bagIcon: {
    left: 3,
    width: 18,
    height: 20,
    top: 2,
    position: "absolute",
  },
  ellipseIcon: {
    left: 0,
    top: 0,
  },
  text10: {
    left: 7,
    top: 2,
    color: Color.colorWhite,
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
  },
  ellipseParent: {
    top: -7,
    left: 9,
  },
  cartIcon: {
    top: 1,
    left: 315,
  },
  heyRahulParent: {
    top: 52,
    width: 339,
    height: 30,
    left: 20,
    position: "absolute",
  },
  subtractIcon: {
    borderRadius: 4,
    height: 89,
    width: 375,
  },
  homeIconAndText: {
    left: 49,
    width: 56,
    top: 0,
  },
  more: {
    top: 25,
    color: Color.greyScaleBlack03,
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
    fontSize: FontSize.labelRegular12_size,
    textAlign: "center",
    left: 0,
  },
  menuMoreVertical: {
    left: 2,
    top: 0,
    overflow: "hidden",
  },
  moreIconAndText: {
    left: 304,
    width: 29,
    top: 31,
    height: 41,
  },
  iconlytwoToneheart: {
    width: "45.28%",
    right: "30.19%",
    left: "24.53%",
  },
  favouriteIconAndText: {
    left: 205,
    width: 53,
    top: 31,
    height: 41,
  },
  iconlycurvedcategory: {
    width: "38.1%",
    right: "31.75%",
    left: "30.16%",
  },
  categoriesIconAndText: {
    top: 30,
    left: 113,
    width: 63,
  },
  tabBar: {
    bottom: 0,
    height: 103,
    width: 375,
    left: 0,
    position: "absolute",
  },
  groceryHome: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
  grocerycard: {
    width: 160,
    height: 194,
    backgroundColor: "#F8F9FB",
    borderRadius: 12,
    overflow: 'hidden',
    margin: 7.5
  },
  grocerycardchild: {
    width: 128,
    height: 84,
    top: 90,
    left: 17,
    borderRadius: 12
  }
});

export default GroceryHome;