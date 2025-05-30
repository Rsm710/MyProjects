export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      BarPropose: {
        Row: {
          address: string | null
          contact: string | null
          created_at: string
          id: number
          nomBar: string | null
        }
        Insert: {
          address?: string | null
          contact?: string | null
          created_at?: string
          id?: number
          nomBar?: string | null
        }
        Update: {
          address?: string | null
          contact?: string | null
          created_at?: string
          id?: number
          nomBar?: string | null
        }
        Relationships: []
      }
      Bars: {
        Row: {
          address: string | null
          ambiance_Musicale:
            | Database["public"]["Enums"]["Ambiance musicale"]
            | null
          Bar: boolean | null
          Bdn: boolean | null
          boisson: Database["public"]["Enums"]["type de boisson"] | null
          created_at: string
          description: string
          espaceExterieur:
            | Database["public"]["Enums"]["Espace_exterieur"]
            | null
          Facebook: string | null
          filters: string[] | null
          googleMapId: string | null
          horaire_fermeture: string | null
          horaire_ouverture: string | null
          id: number
          image: string
          Insta: string | null
          IsMenu: boolean
          latitude: number
          logo: string | null
          longitude: number
          Menu: string[] | null
          nom: string
          nouriture: Database["public"]["Enums"]["type de cuisine"] | null
          Owner: string | null
          Restau: boolean | null
          wantReview: boolean | null
        }
        Insert: {
          address?: string | null
          ambiance_Musicale?:
            | Database["public"]["Enums"]["Ambiance musicale"]
            | null
          Bar?: boolean | null
          Bdn?: boolean | null
          boisson?: Database["public"]["Enums"]["type de boisson"] | null
          created_at?: string
          description?: string
          espaceExterieur?:
            | Database["public"]["Enums"]["Espace_exterieur"]
            | null
          Facebook?: string | null
          filters?: string[] | null
          googleMapId?: string | null
          horaire_fermeture?: string | null
          horaire_ouverture?: string | null
          id?: number
          image: string
          Insta?: string | null
          IsMenu?: boolean
          latitude: number
          logo?: string | null
          longitude: number
          Menu?: string[] | null
          nom: string
          nouriture?: Database["public"]["Enums"]["type de cuisine"] | null
          Owner?: string | null
          Restau?: boolean | null
          wantReview?: boolean | null
        }
        Update: {
          address?: string | null
          ambiance_Musicale?:
            | Database["public"]["Enums"]["Ambiance musicale"]
            | null
          Bar?: boolean | null
          Bdn?: boolean | null
          boisson?: Database["public"]["Enums"]["type de boisson"] | null
          created_at?: string
          description?: string
          espaceExterieur?:
            | Database["public"]["Enums"]["Espace_exterieur"]
            | null
          Facebook?: string | null
          filters?: string[] | null
          googleMapId?: string | null
          horaire_fermeture?: string | null
          horaire_ouverture?: string | null
          id?: number
          image?: string
          Insta?: string | null
          IsMenu?: boolean
          latitude?: number
          logo?: string | null
          longitude?: number
          Menu?: string[] | null
          nom?: string
          nouriture?: Database["public"]["Enums"]["type de cuisine"] | null
          Owner?: string | null
          Restau?: boolean | null
          wantReview?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Bars_Owner_fkey"
            columns: ["Owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          bar_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          bar_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          bar_id?: number | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_bar_id_fkey"
            columns: ["bar_id"]
            isOneToOne: false
            referencedRelation: "Bars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Filtres: {
        Row: {
          created_at: string
          id: number
          nom: string
        }
        Insert: {
          created_at?: string
          id?: number
          nom: string
        }
        Update: {
          created_at?: string
          id?: number
          nom?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          fav: string[] | null
          full_name: string | null
          group: Database["public"]["Enums"]["GROUP"]
          id: string
          mail: string | null
          Plan: Database["public"]["Enums"]["Plan"]
          stripeCustomerId: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          fav?: string[] | null
          full_name?: string | null
          group?: Database["public"]["Enums"]["GROUP"]
          id: string
          mail?: string | null
          Plan?: Database["public"]["Enums"]["Plan"]
          stripeCustomerId?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          fav?: string[] | null
          full_name?: string | null
          group?: Database["public"]["Enums"]["GROUP"]
          id?: string
          mail?: string | null
          Plan?: Database["public"]["Enums"]["Plan"]
          stripeCustomerId?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_bars_by_title_prefix: {
        Args: {
          prefix: string
        }
        Returns: {
          address: string | null
          ambiance_Musicale:
            | Database["public"]["Enums"]["Ambiance musicale"]
            | null
          Bar: boolean | null
          Bdn: boolean | null
          boisson: Database["public"]["Enums"]["type de boisson"] | null
          created_at: string
          description: string
          espaceExterieur:
            | Database["public"]["Enums"]["Espace_exterieur"]
            | null
          Facebook: string | null
          filters: string[] | null
          googleMapId: string | null
          horaire_fermeture: string | null
          horaire_ouverture: string | null
          id: number
          image: string
          Insta: string | null
          IsMenu: boolean
          latitude: number
          logo: string | null
          longitude: number
          Menu: string[] | null
          nom: string
          nouriture: Database["public"]["Enums"]["type de cuisine"] | null
          Owner: string | null
          Restau: boolean | null
          wantReview: boolean | null
        }[]
      }
    }
    Enums: {
      "Ambiance musicale":
        | "jazz"
        | "lounge"
        | "├®lectro"
        | "live music"
        | "pas de musique"
      Espace_exterieur: "terrasse" | "rooftop" | "jardin" | "pas dexterieur"
      filtreBar:
        | "Bar ├á vins"
        | "Bar ├á cocktails"
        | "Bar ├á bi├¿res"
        | "Pub"
        | "Bar lounge"
        | "Bar ├á th├¿mes (sportif, karaok├®, etc.)"
        | "Bar de plage"
      GROUP: "USER" | "ADMIN" | "OWNER"
      Plan: "FREE" | "Classique" | "Premium" | "Platine"
      "type de boisson":
        | "cocktail"
        | "biere locale"
        | "vins"
        | "boisson non alcoolisees"
      "type de cuisine": "tapas" | "pizza" | "gastronomique" | "vegetarien"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
