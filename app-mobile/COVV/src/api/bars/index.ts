import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { Search } from "@tamagui/lucide-icons";
import { err } from "react-native-svg";
import { Database } from "@/src/database.types";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";





export const isfavorited = (barId, userId) =>{
    return useQuery({
        queryKey:['isFavorited'],
        queryFn: async()=>{
            const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .eq('bar_id', barId)

    if (error) {
        console.error('Erreur lors de la vérification des favoris:', error);
        return false;
    }

    return data.length > 0; // Renvoie true si data existe, sinon false
        },
        enabled: !!userId && !!barId,
    });
};

export const removeFromFavorites = async (barId, userId) => {
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('bar_id', barId);
  
    if (error) {
      console.error('Error removing from favorites:', error);
      throw error; // Rethrow the error to be handled in the calling function
    } else {
      console.log('Bar removed from favorites:', data);
      return data; // Optionally return the data if needed
    }
  };
export const addToFavorites = async (barId, userId) => {
    const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, bar_id: barId }]);

    if (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
    } else {
        console.log('Bar ajouté aux favoris:', data);
    }
};

export const getFavorites = (userId) => {
    return useQuery({
        queryKey:['favorites'],
        queryFn: async()=>{
            const { data, error } = await supabase
        .from('favorites')
        .select('bar_id')
        .eq('user_id', userId);

    if (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        return [];
    }

    return data.map(fav => fav.bar_id);
        }
    })
    
};

export const useFindFilters = (Ambiancemusicale:String,Espace_exterieur:String,type_de_cuisine:String,type_de_boisson:String)=>{
    return useQuery({
        queryKey:['filter'],
        queryFn: async()=>{
            let query = supabase
        .from('Bars')
        .select('*')
        if(Ambiancemusicale!="") {query = query.eq('ambiance_Musicale',Ambiancemusicale)}
        if(Espace_exterieur!="") {query = query.eq('espaceExterieur',Espace_exterieur)}
        if(type_de_cuisine!="") {query = query.eq('nouriture',type_de_cuisine)}
        if(type_de_boisson!="") {query = query.eq('boisson',type_de_boisson)}
        const{data,error} = await query;
        if(error){
            throw new Error(error.message);
        }
        return data;
        },
    });
}

export const useFilters = () =>{
    return useQuery({
        queryKey: ['filtres'],
        queryFn: async()=>{
            const {data,error} = await supabase.from('Filtres').select('*');
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useBarList = () =>{
    return useQuery({
        queryKey: ['Bars'],
        queryFn: async()=>{
            const {data,error} = await supabase.from('Bars').select('*');
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const UseBar = (id:number) =>{
    return useQuery({
        queryKey : ['Bars',id],
        queryFn: async () =>{
            const {data,error} = await supabase
            .from('Bars')
            .select('*')
            .eq('id',id)
            .single();
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useInsertProposition = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(donnee:any){
            const {error,data:NewBar} = await supabase.from('BarPropose').insert({
                nomBar : donnee.nom,
                address : donnee.address,
                contact : donnee.contact
            })
            .single();
        
        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
        return NewBar;
    },
    async onSuccess(){
        await queryClient.invalidateQueries(['BarPropose']);
    },
    onError(error){
        alert('erreur');
    }

    })
    
};

export const useInsertBar = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(donnee:any){
            const {error,data:NewBar} = await supabase.from('Bars').insert({
                image : donnee.image,
                nom : donnee.nom,
                latitude : donnee.latitude,
                longitude : donnee.longitude,
                description : donnee.description,
                filters : donnee.Filter,
                logo : donnee.logo,
                address : donnee.logo,
            })
            .single();
            if(error){
                throw new Error(error.message);
            }
            return NewBar;
        },
        async onSuccess(){
            await queryClient.invalidateQueries(['Bars']);
        },
        onError(error){
            alert('erreur');
        }
    })
};

export const useDeleteBars = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id:number){
            await supabase.from('Bars').delete().eq('id',id);
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['Bars']);
        },
    });
};

export const useBar = (bar:boolean) =>{
    return useQuery({
        queryKey : ['bars',bar],
        queryFn : async () =>{
            const{data,error} = await supabase
            .from('Bars')
            .select('*')
            .is('Bar',true);
            if(error){
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useBarFav = (id : Array<string>) =>{
    return useQuery({
        queryKey : ['fav',id],
        queryFn : async() =>{
            const { data, error } = await supabase
            .from('Bars')
            .select('*')
            .in('id', id);
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
   

}

export const useGetOpenBars = () => {
    return useQuery({
        queryKey: ['GetOpenBars'],
        queryFn: async () => {
            const now = new Date();
            const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

            const { data: bars, error } = await supabase
                .from('Bars')
                .select('*')
                .lte('horaire_ouverture', currentTime) 
                .gte('horaire_fermeture', currentTime);

            if (error) {
                console.error('Erreur lors de la récupération des bars ouverts :', error);
                throw new Error('Erreur lors de la récupération des bars ouverts');
            }
            console.log("opened"+bars)
            return bars;
        },
    });
};

export const useGetFav = (id:string) =>{
    return useQuery({
        queryKey:['GetFav',id],
        queryFn: async()=>{
            const { data, error } = await supabase
            .from('favorites')
            .select('bar_id')
            .eq('user_id', id); // Remplacez userId par l'ID de l'utilisateur

            if (error) {
            console.error('Erreur lors de la récupération des bar_id :', error);
            } else {
            const barIds = data.map(favorite => favorite.bar_id);

            const { data: bars, error: barsError } = await supabase
                .from('Bars')
                .select('*')
                .in('id', barIds);

            if (barsError) {
                console.error('Erreur lors de la récupération des bars :', barsError);
            } else {
                return bars;
            }
            }
        }
    })
}

export const useBarFilter = (bar:boolean,restau:boolean,bdn:boolean) =>{
    return useQuery({
        queryKey : ['bars',bar,restau,bdn],
        queryFn : async () => { 
        let query = supabase
        .from('Bars')
        .select('*')
        if(bar) {query = query.is('Bar',true)}
        if(restau) {query = query.is('Restau',true)}
        if(bdn) {query = query.is('Bdn',true)}
        const{data,error} = await query;
        if(error){
            throw new Error(error.message);
        }
        return data;
        },
    });
};

export const useBarType = (filters:String[])=>{
    return useQuery({
        queryKey : ['bars'],
        queryFn : async () =>{
            const{data,error} = await supabase
            .from('Bars')
            .select('*')
            .overlaps('filters',filters);
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};


export const useBarSearch = (search:string) =>{
    return useQuery({
        queryKey : ['bars',search],
        queryFn : async () =>{
            const {data,error} = await supabase
            .rpc('search_bars_by_title_prefix',{prefix : search});
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useFindFav = (userId:string) =>{
    return useQuery({
        queryKey:['profile',userId],
        queryFn: async () =>{
            const {data,error} = await supabase
            .from('profiles')
            .select('fav')
            .eq('id',userId);
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useGetProfilePictureAndusername = (userid:string) =>{
    return useQuery({
        queryKey : ['ppUser',userid],
        queryFn : async () =>{
            const {data,error} = await supabase
            .from('profiles')
            .select(`username,avatar_url`)
            .eq('id',userid);
            if(error){
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useFindMyBar = (myId:string) =>{
    return useQuery({
        queryKey : ['bars',myId],
        queryFn : async () =>{
            const {data,error} = await supabase
            .from('Bars')
            .select('*')
            .eq('Owner',myId);
            if(error){
                throw new Error(error.message);
            }
            return data;
        },
    });
};
interface UpdateFavProps {
    id: string; // or number, based on your ID type
    favo: string[]; // or the type of your favorite array
}

interface updateProfileProps{
    id:string;
    image:string;
    username:string;
}



export const useUpdateProfile = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn({id,username}:updateProfileProps){
            const{data,error} = await supabase
            .from('profiles')
            .update({username : username})
            .eq('id',id)
            .select();
            if(error){
                alert("le formulaire est vide")
                return error;
            }
            return data;
        },
        async onSuccess(_,{id}){
            await queryClient.invalidateQueries(['profils']);
            await queryClient.invalidateQueries(['profils',id,username]);
        },
        onError(error){
            console.log(error);
        },
    })
}

export const useUpdateFav = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn({id,favo}:UpdateFavProps){
            const {data,error} = await supabase
            .from('profiles')
            .update({fav : favo})
            .eq('id',id)
            .select();
            if(error){
                throw error;
            }
            return data;
        },
        async onSuccess(_,{id}){
            await queryClient.invalidateQueries(['profils']);
            await queryClient.invalidateQueries(['profils',id]);
        },
        onError(error){
            console.log(error);
        },
    })
}


export const useUpdateBar = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn({id,...update}:any){
            const {data,error} = await supabase
            .from('Bars')
            .update(update)
            .eq('id',id)
            .select();
            if(error){
                throw error;
            }
            return data;
        },
        async onSuccess(_,{id}){
            await queryClient.invalidateQueries(['Bars']);
            await queryClient.invalidateQueries(['Bars',id]);
        },
        onError(error){
            console.log(error);
        },
    });
};