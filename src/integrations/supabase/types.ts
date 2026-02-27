export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      about_images: {
        Row: {
          alt: string
          created_at: string | null
          id: string
          image_url: string
          sort_order: number | null
        }
        Insert: {
          alt: string
          created_at?: string | null
          id?: string
          image_url: string
          sort_order?: number | null
        }
        Update: {
          alt?: string
          created_at?: string | null
          id?: string
          image_url?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          link: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          link?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string | null
          id: string
          image_url: string
          is_published: boolean | null
          sort_order: number | null
          title: string
        }
        Insert: {
          alt_text?: string | null
          category: string
          created_at?: string | null
          id?: string
          image_url: string
          is_published?: boolean | null
          sort_order?: number | null
          title: string
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          id?: string
          image_url?: string
          is_published?: boolean | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      library_images: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string
          file_name: string
          id: string
          image_url: string
        }
        Insert: {
          alt_text?: string | null
          category: string
          created_at?: string
          file_name: string
          id?: string
          image_url: string
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string
          file_name?: string
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          meta_description: string | null
          meta_title: string | null
          noindex: boolean | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          path: string
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          path: string
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          path?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_submissions: {
        Row: {
          audience_size: string | null
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          event_date: string | null
          event_type: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          services: string[] | null
          status: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          audience_size?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          event_date?: string | null
          event_type?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          services?: string[] | null
          status?: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          audience_size?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          event_date?: string | null
          event_type?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          services?: string[] | null
          status?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      service_sections: {
        Row: {
          id: string
          service_key: string
          image_url: string
          file_name: string
          alt_text: string
          title_attr: string | null
          caption: string | null
          section_heading: string | null
          section_description: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          service_key: string
          image_url: string
          file_name: string
          alt_text: string
          title_attr?: string | null
          caption?: string | null
          section_heading?: string | null
          section_description?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          service_key?: string
          image_url?: string
          file_name?: string
          alt_text?: string
          title_attr?: string | null
          caption?: string | null
          section_heading?: string | null
          section_description?: string | null
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          alignment: string
          bg_color: string | null
          bg_opacity: number | null
          created_at: string
          font_color: string | null
          font_family: string | null
          font_size: number | null
          font_weight: string
          id: string
          key: string
          offset_x: number | null
          offset_y: number | null
          page: string
          section: string
          updated_at: string
          value: string
        }
        Insert: {
          alignment?: string
          bg_color?: string | null
          bg_opacity?: number | null
          created_at?: string
          font_color?: string | null
          font_family?: string | null
          font_size?: number | null
          font_weight?: string
          id?: string
          key: string
          offset_x?: number | null
          offset_y?: number | null
          page: string
          section: string
          updated_at?: string
          value: string
        }
        Update: {
          alignment?: string
          bg_color?: string | null
          bg_opacity?: number | null
          created_at?: string
          font_color?: string | null
          font_family?: string | null
          font_size?: number | null
          font_weight?: string
          id?: string
          key?: string
          offset_x?: number | null
          offset_y?: number | null
          page?: string
          section?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      site_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          key: string
          page: string
          section: string
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          key: string
          page: string
          section: string
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          key?: string
          page?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          client_role: string | null
          company: string | null
          created_at: string
          id: string
          is_featured: boolean | null
          quote: string
          rating: number | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          client_name: string
          client_role?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean | null
          quote: string
          rating?: number | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          client_name?: string
          client_role?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean | null
          quote?: string
          rating?: number | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
