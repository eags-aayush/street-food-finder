import { type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStatus(id: string, status: string): Promise<void>;
  getUsersByRole(role: string): Promise<User[]>;

  // Product management
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsBySupplierId(supplierId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<void>;
  deleteProduct(id: string): Promise<void>;

  // Order management
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrdersByVendorId(vendorId: string): Promise<Order[]>;
  getOrdersBySupplierId(supplierId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<void>;

  // Order items
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Cart management
  getCartItems(vendorId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<void>;
  removeFromCart(id: string): Promise<void>;
  clearCart(vendorId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.cartItems = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      email: "admin@streetmarket.com",
      password: "admin123", // In production, this should be hashed
      role: "admin",
      name: "System Administrator",
      phone: null,
      businessName: null,
      companyName: null,
      contactPerson: null,
      businessLicense: null,
      status: "active",
      createdAt: new Date(),
    });

    // Create sample suppliers
    const supplier1Id = randomUUID();
    this.users.set(supplier1Id, {
      id: supplier1Id,
      username: "freshfarms",
      email: "amit@freshfarms.com",
      password: "password123",
      role: "supplier",
      name: "Amit Singh",
      phone: "9876543213",
      businessName: null,
      companyName: "Fresh Farms Ltd",
      contactPerson: "Amit Singh",
      businessLicense: "LIC001",
      status: "active",
      createdAt: new Date(),
    });

    const supplier2Id = randomUUID();
    this.users.set(supplier2Id, {
      id: supplier2Id,
      username: "spicevalley",
      email: "meera@spicevalley.com",
      password: "password123",
      role: "supplier",
      name: "Meera Joshi",
      phone: "9876543214",
      businessName: null,
      companyName: "Spice Valley Co",
      contactPerson: "Meera Joshi",
      businessLicense: "LIC002",
      status: "active",
      createdAt: new Date(),
    });

    // Create sample products
    const products = [
      {
        name: "Fresh Red Onions",
        category: "vegetables",
        description: "Premium quality red onions, freshly harvested. Perfect for street food preparations.",
        price: "25.00",
        stock: 500,
        minOrder: 10,
        imageUrl: "https://images.unsplash.com/photo-1508313880080-c4bef43d8e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        supplierId: supplier1Id,
      },
      {
        name: "Fresh Tomatoes",
        category: "vegetables",
        description: "Fresh, ripe tomatoes with rich color and flavor. Ideal for chutneys and curries.",
        price: "30.00",
        stock: 300,
        minOrder: 5,
        imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        supplierId: supplier1Id,
      },
      {
        name: "Green Chilies",
        category: "vegetables",
        description: "Fresh, hot green chilies. Essential for authentic Indian street food flavors.",
        price: "80.00",
        stock: 100,
        minOrder: 2,
        imageUrl: "https://images.unsplash.com/photo-1583486921463-ad1c3c4a3a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        supplierId: supplier2Id,
      },
      {
        name: "Turmeric Powder",
        category: "spices",
        description: "Pure turmeric powder with vibrant color and authentic taste. No artificial additives.",
        price: "200.00",
        stock: 50,
        minOrder: 1,
        imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        supplierId: supplier2Id,
      },
      {
        name: "Sunflower Oil",
        category: "oils",
        description: "Pure sunflower oil, perfect for deep frying and cooking street food items.",
        price: "120.00",
        stock: 200,
        minOrder: 5,
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        supplierId: supplier1Id,
      },
      {
        name: "Basmati Rice",
        category: "grains",
        description: "Premium quality basmati rice with long grains and aromatic fragrance.",
        price: "90.00",
        stock: 400,
        minOrder: 10,
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        supplierId: supplier1Id,
      },
    ];

    products.forEach(product => {
      const id = randomUUID();
      this.products.set(id, {
        id,
        ...product,
        createdAt: new Date(),
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      id,
      phone: insertUser.phone || null,
      businessName: insertUser.businessName || null,
      companyName: insertUser.companyName || null,
      contactPerson: insertUser.contactPerson || null,
      businessLicense: insertUser.businessLicense || null,
      status: insertUser.status || "active",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStatus(id: string, status: string): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.status = status;
    }
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.role === role);
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsBySupplierId(supplierId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.supplierId === supplierId);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct,
      id,
      description: insertProduct.description || null,
      imageUrl: insertProduct.imageUrl || null,
      stock: insertProduct.stock || 0,
      minOrder: insertProduct.minOrder || 1,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const product = this.products.get(id);
    if (product) {
      Object.assign(product, updates);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    this.products.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByVendorId(vendorId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.vendorId === vendorId);
  }

  async getOrdersBySupplierId(supplierId: string): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    const supplierOrders = [];
    
    for (const order of orders) {
      const items = await this.getOrderItems(order.id);
      for (const item of items) {
        const product = await this.getProductById(item.productId);
        if (product && product.supplierId === supplierId) {
          supplierOrders.push(order);
          break;
        }
      }
    }
    
    return supplierOrders;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder,
      id,
      status: insertOrder.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<void> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
    }
  }

  // Order items methods
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Cart methods
  async getCartItems(vendorId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.vendorId === vendorId);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.vendorId === insertCartItem.vendorId && item.productId === insertCartItem.productId
    );

    if (existingItem) {
      existingItem.quantity = insertCartItem.quantity;
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<void> {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      cartItem.quantity = quantity;
    }
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(vendorId: string): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([id, item]) => {
      if (item.vendorId === vendorId) {
        this.cartItems.delete(id);
      }
    });
  }
}

export const storage = new MemStorage();
