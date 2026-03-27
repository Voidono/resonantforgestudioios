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
      asset_request_items: {
        Row: {
          animation: boolean | null
          asset_number: string
          category: string | null
          created_at: string
          full_production: boolean | null
          id: string
          iterations: Json | null
          project_description: string | null
          project_descriptor: string | null
          reference_search: boolean | null
          request_id: string
          requested_artist: string | null
          rigging: boolean | null
          size: string
          stage_toggles: Json | null
          studio_code: string | null
          vfx: boolean | null
          worked_before: boolean | null
        }
        Insert: {
          animation?: boolean | null
          asset_number: string
          category?: string | null
          created_at?: string
          full_production?: boolean | null
          id?: string
          iterations?: Json | null
          project_description?: string | null
          project_descriptor?: string | null
          reference_search?: boolean | null
          request_id: string
          requested_artist?: string | null
          rigging?: boolean | null
          size: string
          stage_toggles?: Json | null
          studio_code?: string | null
          vfx?: boolean | null
          worked_before?: boolean | null
        }
        Update: {
          animation?: boolean | null
          asset_number?: string
          category?: string | null
          created_at?: string
          full_production?: boolean | null
          id?: string
          iterations?: Json | null
          project_description?: string | null
          project_descriptor?: string | null
          reference_search?: boolean | null
          request_id?: string
          requested_artist?: string | null
          rigging?: boolean | null
          size?: string
          stage_toggles?: Json | null
          studio_code?: string | null
          vfx?: boolean | null
          worked_before?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_request_items_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "asset_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_requests: {
        Row: {
          created_at: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      asset_specifications: {
        Row: {
          animation_count: string | null
          asset_consistency: string | null
          asset_item_id: string | null
          asset_role: string | null
          asset_usage: string | null
          bulk_order_tier: string | null
          camera_distance: string | null
          channel_packed: boolean | null
          created_at: string
          deliverables: Json | null
          delivery_format: string | null
          delivery_material_workflow: string | null
          delivery_notes: string | null
          delivery_texture_set_count: string | null
          delivery_type: string | null
          destruction_behavior: string | null
          env_kit: boolean | null
          fidelity: string | null
          file_format: string | null
          gameplay_interaction: Json | null
          geometry_reuse: string | null
          id: string
          lod_config: string | null
          map_checklist: Json | null
          material_notes: string | null
          material_workflow: string | null
          modular: boolean | null
          modular_kit: boolean | null
          num_variations: string | null
          pipeline_config: Json | null
          pivot_orientation: string | null
          polycount_range: string | null
          priority: string | null
          reference_completeness: string | null
          reference_quality: string | null
          request_id: string
          rig_notes: string | null
          rig_type: string | null
          scale: string | null
          style_direction: string | null
          surface_detail: string | null
          target_engine: string | null
          texture_resolution: string | null
          texture_set_count: string | null
          variant_method: string | null
          variant_notes: string | null
          variant_types: Json | null
          vfx_integration: string | null
          visual_notes: string | null
        }
        Insert: {
          animation_count?: string | null
          asset_consistency?: string | null
          asset_item_id?: string | null
          asset_role?: string | null
          asset_usage?: string | null
          bulk_order_tier?: string | null
          camera_distance?: string | null
          channel_packed?: boolean | null
          created_at?: string
          deliverables?: Json | null
          delivery_format?: string | null
          delivery_material_workflow?: string | null
          delivery_notes?: string | null
          delivery_texture_set_count?: string | null
          delivery_type?: string | null
          destruction_behavior?: string | null
          env_kit?: boolean | null
          fidelity?: string | null
          file_format?: string | null
          gameplay_interaction?: Json | null
          geometry_reuse?: string | null
          id?: string
          lod_config?: string | null
          map_checklist?: Json | null
          material_notes?: string | null
          material_workflow?: string | null
          modular?: boolean | null
          modular_kit?: boolean | null
          num_variations?: string | null
          pipeline_config?: Json | null
          pivot_orientation?: string | null
          polycount_range?: string | null
          priority?: string | null
          reference_completeness?: string | null
          reference_quality?: string | null
          request_id: string
          rig_notes?: string | null
          rig_type?: string | null
          scale?: string | null
          style_direction?: string | null
          surface_detail?: string | null
          target_engine?: string | null
          texture_resolution?: string | null
          texture_set_count?: string | null
          variant_method?: string | null
          variant_notes?: string | null
          variant_types?: Json | null
          vfx_integration?: string | null
          visual_notes?: string | null
        }
        Update: {
          animation_count?: string | null
          asset_consistency?: string | null
          asset_item_id?: string | null
          asset_role?: string | null
          asset_usage?: string | null
          bulk_order_tier?: string | null
          camera_distance?: string | null
          channel_packed?: boolean | null
          created_at?: string
          deliverables?: Json | null
          delivery_format?: string | null
          delivery_material_workflow?: string | null
          delivery_notes?: string | null
          delivery_texture_set_count?: string | null
          delivery_type?: string | null
          destruction_behavior?: string | null
          env_kit?: boolean | null
          fidelity?: string | null
          file_format?: string | null
          gameplay_interaction?: Json | null
          geometry_reuse?: string | null
          id?: string
          lod_config?: string | null
          map_checklist?: Json | null
          material_notes?: string | null
          material_workflow?: string | null
          modular?: boolean | null
          modular_kit?: boolean | null
          num_variations?: string | null
          pipeline_config?: Json | null
          pivot_orientation?: string | null
          polycount_range?: string | null
          priority?: string | null
          reference_completeness?: string | null
          reference_quality?: string | null
          request_id?: string
          rig_notes?: string | null
          rig_type?: string | null
          scale?: string | null
          style_direction?: string | null
          surface_detail?: string | null
          target_engine?: string | null
          texture_resolution?: string | null
          texture_set_count?: string | null
          variant_method?: string | null
          variant_notes?: string | null
          variant_types?: Json | null
          vfx_integration?: string | null
          visual_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_specifications_asset_item_id_fkey"
            columns: ["asset_item_id"]
            isOneToOne: false
            referencedRelation: "asset_request_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_specifications_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "asset_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          department: string | null
          id: string
          intake_reference: string | null
          message_body: string | null
          operator_name: string
          studio_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: string
          intake_reference?: string | null
          message_body?: string | null
          operator_name: string
          studio_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: string
          intake_reference?: string | null
          message_body?: string | null
          operator_name?: string
          studio_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          created_at: string
          id: string
          service_title: string
          service_type: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          service_title: string
          service_type: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          service_title?: string
          service_type?: string
          status?: string
          user_id?: string
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
      vote_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "vote_items"
            referencedColumns: ["id"]
          },
        ]
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
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
