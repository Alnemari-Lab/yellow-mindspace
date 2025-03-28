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
      mbti_development_areas: {
        Row: {
          area_key: string
          created_at: string
          explanation_ar: string
          explanation_en: string
          id: string
          type_code: string
        }
        Insert: {
          area_key: string
          created_at?: string
          explanation_ar: string
          explanation_en: string
          id?: string
          type_code: string
        }
        Update: {
          area_key?: string
          created_at?: string
          explanation_ar?: string
          explanation_en?: string
          id?: string
          type_code?: string
        }
        Relationships: []
      }
      mbti_questions: {
        Row: {
          created_at: string
          dimension: Database["public"]["Enums"]["mbti_dimension"]
          id: number
          question_text: string
          question_text_ar: string
        }
        Insert: {
          created_at?: string
          dimension: Database["public"]["Enums"]["mbti_dimension"]
          id?: number
          question_text: string
          question_text_ar?: string
        }
        Update: {
          created_at?: string
          dimension?: Database["public"]["Enums"]["mbti_dimension"]
          id?: number
          question_text?: string
          question_text_ar?: string
        }
        Relationships: []
      }
      mbti_responses: {
        Row: {
          created_at: string
          id: string
          question_id: number
          response: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: number
          response: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: number
          response?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mbti_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "mbti_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      mbti_results: {
        Row: {
          created_at: string
          e_score: number
          f_score: number
          i_score: number
          id: string
          j_score: number
          n_score: number
          p_score: number
          s_score: number
          t_score: number
          type_result: string
          user_id: string
        }
        Insert: {
          created_at?: string
          e_score: number
          f_score: number
          i_score: number
          id?: string
          j_score: number
          n_score: number
          p_score: number
          s_score: number
          t_score: number
          type_result: string
          user_id: string
        }
        Update: {
          created_at?: string
          e_score?: number
          f_score?: number
          i_score?: number
          id?: string
          j_score?: number
          n_score?: number
          p_score?: number
          s_score?: number
          t_score?: number
          type_result?: string
          user_id?: string
        }
        Relationships: []
      }
      mbti_type_details: {
        Row: {
          description_ar: string
          description_en: string
          recommended_majors_ar: string[]
          recommended_majors_en: string[]
          type_code: string
        }
        Insert: {
          description_ar: string
          description_en: string
          recommended_majors_ar: string[]
          recommended_majors_en: string[]
          type_code: string
        }
        Update: {
          description_ar?: string
          description_en?: string
          recommended_majors_ar?: string[]
          recommended_majors_en?: string[]
          type_code?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          face_image_url: string | null
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          face_image_url?: string | null
          full_name: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          face_image_url?: string | null
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_mbti_response: {
        Args: {
          p_user_id: string
          p_question_id: number
          p_response: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      mbti_dimension: "EI" | "SN" | "TF" | "JP"
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
