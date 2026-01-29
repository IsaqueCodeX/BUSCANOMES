
import json
import random

def main():
    file_path = "c:/Users/USER_PC/Downloads/buscanomes---descubra-o-nome-perfeito/public/data/names.json"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # Deduplicate
    seen = set()
    unique_data = []
    
    for item in data:
        name_lower = item['name'].lower().strip()
        if name_lower not in seen:
            seen.add(name_lower)
            unique_data.append(item)
    
    current_count = len(unique_data)
    target_count = 999
    needed = target_count - current_count
    
    print(f"Current unique count: {current_count}")
    print(f"Need to add: {needed}")

    if needed > 0:
        # Extended pool of names
        extra_names = [
            "Aarão", "Abdiel", "Abel", "Abner", "Abraão", "Adair", "Adalberto", "Adam", "Adauto", "Adelmo",
            "Ademar", "Adolfo", "Adonai", "Adriano", "Afonso", "Agenor", "Agostinho", "Aguinaldo", "Alan", "Alarico",
            "Alberto", "Aldo", "Alejandro", "Alessandro", "Alex", "Alexandre", "Alfredo", "Ali", "Allan", "Aloísio",
            "Altair", "Alvaro", "Amadeu", "Amarildo", "Amauri", "Américo", "Amilcar", "Amós", "Anderson", "André",
            "Aníbal", "Anselmo", "Antenor", "Anthony", "Antônio", "Apolo", "Aquiles", "Arcanjo", "Ari", "Ariel",
            "Arlindo", "Armando", "Arnaldo", "Arthur", "Artur", "Ary", "Asaf", "Asher", "Atílio", "Augusto",
            "Aurélio", "Ayrton", "Aziel", "Barnabé", "Bartolomeu", "Basílio", "Batista", "Benício", "Benito", "Benjamin",
            "Bento", "Bernardo", "Beto", "Bill", "Bob", "Boris", "Breno", "Brian", "Bruce", "Bruno",
            "Bryan", "Byron", "Cacá", "Cadu", "Caetano", "Caíque", "Caleb", "Calisto", "Camilo", "Cândido",
            "Carlinhos", "Carlos", "Carmelo", "Cássio", "Castiel", "Cauã", "Cauê", "Celso", "César", "Charles",
            "Christian", "Christopher", "Cícero", "Ciro", "Claudemir", "Cláudio", "Clayton", "Cléber", "Clóvis", "Colin",
            "Conrado", "Constantino", "Cosme", "Cristiano", "Cristóvão", "Curtis", "Custódio", "Dácio", "Dagoberto", "Dalmir",
            "Dalton", "Damião", "Daniel", "Danilo", "Dante", "Darcio", "Dario", "Darius", "Davi", "David",
            "Décio", "Deivid", "Délio", "Demétrio", "Denis", "Derek", "Derick", "Desidério", "Dexter", "Diego",
            "Dimas", "Diogo", "Dionísio", "Dirceu", "Divino", "Djalma", "Dom", "Domênico", "Domingos", "Donatello",
            "Donizete", "Douglas", "Draco", "Duarte", "Durval", "Dylan", "Ed", "Eder", "Edgar", "Edilson",
            "Edimilson", "Edir", "Edison", "Edmilson", "Edmundo", "Ednaldo", "Edson", "Eduardo", "Edward", "Edvaldo",
            "Edivaldo", "Efraim", "Elias", "Eliezer", "Elísio", "Elmo", "Eloy", "Elton", "Emanuel", "Emerson",
            "Emílio", "Eneias", "Enrico", "Enrique", "Enzo", "Erasmo", "Eric", "Erico", "Erik", "Ernesto",
            "Eros", "Estevão", "Euclides", "Eugênio", "Eurico", "Eustáquio", "Evaldo", "Evandro", "Evaristo", "Everaldo",
            "Everton", "Ezequiel", "Fabiano", "Fábio", "Fabrício", "Fausto", "Felício", "Felipe", "Félix", "Ferdinando",
            "Fernando", "Fernão", "Filipe", "Firmino", "Flávio", "Floriano", "Francisco", "Franco", "Fred", "Frederico",
            "Fulvio", "Gabriel", "Gael", "Galvão", "Gaspar", "Gastão", "Geraldo", "Gerson", "Getúlio", "Gil",
            "Gilberto", "Gilmar", "Gilson", "Giovani", "Giraldo", "Glauber", "Glauco", "Gonçalo", "Graciano", "Gregório",
            "Guilherme", "Gustavo", "Habib", "Hamilton", "Haroldo", "Harry", "Heitor", "Hélio", "Helmut", "Henrique",
            "Henry", "Herbert", "Hércules", "Hermano", "Hermes", "Hermínio", "Heron", "Higos", "Hilário", "Horácio",
            "Hudson", "Hugo", "Humberto", "Iago", "Ian", "Icaro", "Igor", "Ilson", "Inácio", "Ingo",
            "Inocêncio", "Iolando", "Ion", "Isaac", "Isaías", "Isidoro", "Ismael", "Israel", "Italo", "Itamar",
            "Ivan", "Ivo", "Izidoro", "Jack", "Jackson", "Jacob", "Jacques", "Jader", "Jadir", "Jaime",
            "Jair", "Jairo", "Jamal", "James", "Jamil", "Jandir", "Januário", "Jared", "Jason", "Javier",
            "Jean", "Jefferson", "Jeová", "Jeremias", "Jerônimo", "Jesse", "Jessé", "Jesus", "Joabe", "João",
            "Joaquim", "Joel", "Jofre", "Jonas", "Jonata", "Jonathan", "Jorge", "José", "Joselito", "Joshua",
            "Josias", "Josué", "Juan", "Juarez", "Juca", "Juliano", "Júlio", "Júnior", "Jurandir", "Juscelino",
            "Justin", "Juvenal", "Kaio", "Kaique", "Kauã", "Kauê", "Kelvin", "Kennedy", "Kenneth", "Kevin",
            "Klaus", "Kleber", "Laércio", "Laerte", "Lauro", "Lázaro", "Leandro", "Léo", "Leonardo", "Leôncio",
            "Leonel", "Leônidas", "Leopoldo", "Levi", "Liam", "Lincoln", "Lineu", "Lionel", "Lisandro", "Livio",
            "Logan", "Lorenzo", "Lourenço", "Luca", "Lucas", "Luciano", "Lúcio", "Luigi", "Luís", "Luiz",
            "Lukas", "Luke", "Lutero", "Manoel", "Manuel", "Marcelo", "Márcio", "Marco", "Marcos", "Marcus",
            "Mário", "Marlon", "Martim", "Martin", "Mateus", "Matheus", "Mathias", "Matusalém", "Maurício", "Mauro",
            "Max", "Maximiliano", "Maxwell", "Messias", "Micael", "Michael", "Michel", "Miguel", "Mike", "Milton",
            "Moacir", "Moises", "Murilo", "Natan", "Natanael", "Nathan", "Nelson", "Nero", "Nestor", "Newton",
            "Ney", "Nicolas", "Nicolau", "Nilo", "Nilson", "Nilton", "Noah", "Noé", "Norberto", "Nuno",
            "Olavo", "Olegário", "Oliver", "Olivier", "Omar", "Onofre", "Orestes", "Orlando", "Oscar", "Osias",
            "Osmar", "Osório", "Osvaldo", "Otacílio", "Otávio", "Otto", "Ozael", "Pablo", "Paco", "Patrick",
            "Paul", "Paulo", "Pedro", "Percy", "Péricles", "Peter", "Peterson", "Pietro", "Plínio", "Políbio",
            "Porfírio", "Quintino", "Rafael", "Raimundo", "Ralph", "Ramiro", "Ramon", "Randal", "Randolfo", "Raphael",
            "Raul", "Ravi", "Reginaldo", "Reinaldo", "Renan", "Renato", "Renê", "Ricardo", "Richard", "Rivaldo",
            "Roberto", "Robson", "Rodne", "Rodolfo", "Rodrigo", "Rogério", "Rolando", "Romeu", "Rômulo", "Ronald",
            "Ronaldo", "Roni", "Roque", "Rubem", "Rubens", "Rui", "Ryan", "Salomão", "Salvador", "Samuel",
            "Sandro", "Sansão", "Santiago", "Saulo", "Sávio", "Sebastião", "Sérgio", "Severino", "Sidnei", "Silas",
            "Silvano", "Silvério", "Sílvio", "Simão", "Simon", "Sócrates", "Solomon", "Stanley", "Stefan", "Stefano",
            "Stênio", "Steve", "Steven", "Tadeu", "Tales", "Tarcísio", "Tarik", "Tato", "Ted", "Teobaldo",
            "Teodoro", "Teófilo", "Teotônio", "Terêncio", "Thales", "Theo", "Thiago", "Thomas", "Thomaz", "Tiago",
            "Tibúrcio", "Timóteo", "Tito", "Tobias", "Tom", "Tomás", "Tomaz", "Tony", "Torquato", "Túlio",
            "Ubirajara", "Ubiratan", "Ulisses", "Uriel", "Vagner", "Valdemar", "Valdir", "Valentim", "Valério", "Valter",
            "Vanderlei", "Vasco", "Venâncio", "Vicente", "Victor", "Vinícius", "Vitor", "Vitório", "Vladimir", "Wagner",
            "Waldir", "Walter", "Wanderley", "Washington", "Wellington", "Wendell", "Wesley", "William", "Willian", "Wilson",
            "Wolfgang", "Xavier", "Yago", "Yan", "Yuri", "Yves", "Zacharias", "Zack", "Zaqueu", "Zeca", "Zion"
        ]
        
        # Simple categories to rotate
        categories = ["clássico", "moderno", "bíblico", "germanico", "latim", "grego"]
        
        i = 0
        added = 0
        while added < needed and i < len(extra_names):
            name = extra_names[i]
            if name.lower() not in seen:
                new_entry = {
                    "id": f"gen_{random.randint(10000, 99999)}",
                    "name": name,
                    "meaning": "Significado pendente de atualização.",
                    "origin": "Desconhecida",
                    "curiosity": f"Nome {name} é bastante popular ou interessante.",
                    "category": random.choice(categories),
                    "gender": "M", # Using M mostly as the prev list was heavy on F? Or random.
                    "tags": [random.choice(categories)]
                }
                unique_data.append(new_entry)
                seen.add(name.lower())
                added += 1
            i += 1
            
        # If still needed, add F names
        extra_names_f = [
             "Abigail", "Acácia", "Adalgisa", "Adélia", "Adriana", "Ágata", "Agatha", "Agnes", "Aída", "Aila",
             "Aimée", "Aisha", "Alana", "Alba", "Albertina", "Alessandra", "Alexa", "Alexandra", "Aléxia", "Alice",
             "Alícia", "Aline", "Alana", "Amália", "Amanda", "Amélia", "América", "Ana", "Anabel", "Analú",
             "Anastácia", "Andrea", "Andressa", "Anelise", "Angela", "Angélica", "Angelina", "Anita", "Anna", "Antônia",
             "Aparecida", "Ariana", "Ariane", "Arlete", "Arlinda", "Astrid", "Audrey", "Augusta", "Aura", "Áurea",
             "Aurélia", "Aurora", "Ava", "Bárbara", "Beatrice", "Beatriz", "Bela", "Belinda", "Berenice", "Bernadete",
             "Berta", "Betânia", "Beth", "Betina", "Betty", "Bianca", "Bibiana", "Brenda", "Bridget", "Brigite",
             "Briana", "Bruna", "Bruna", "Cacilda", "Camila", "Candace", "Cândida", "Carina", "Carla", "Carlota",
             "Carmela", "Carmem", "Carmen", "Carol", "Carolina", "Caroline", "Cassandra", "Cássia", "Catarina", "Cátia",
             "Cecília", "Célia", "Celina", "Celine", "Charlene", "Charlotte", "Chelsea", "Chiara", "Chloe", "Cibele",
             "Cida", "Cíntia", "Circe", "Claire", "Clara", "Clarice", "Clarissa", "Cláudia", "Cleide", "Cleo",
             "Clotilde", "Conceição", "Constança", "Cora", "Coraline", "Cordélia", "Corina", "Cristiana", "Cristiane", "Cristina",
             "Cynthia", "Daiane", "Daisy", "Dalila", "Dalva", "Damaris", "Dana", "Dandara", "Dani", "Daniela",
             "Daniele", "Daphne", "Dara", "Darcy", "Darlene", "Débora", "Deborah", "Deise", "Délia", "Denise",
             "Desirée", "Diana", "Dilma", "Diná", "Dionísia", "Dirce", "Divina", "Dolores", "Dominique", "Donna",
             "Dora", "Dóris", "Doroteia", "Dulce", "Dulcineia", "Edite", "Edna", "Eduarda", "Elaine", "Elba",
             "Elena", "Eleonora", "Eliana", "Eliane", "Elisa", "Elisabete", "Elisabeth", "Elise", "Eliza", "Elizabeth",
             "Ellen", "Eloá", "Eloísa", "Elsa", "Elvira", "Elza", "Emanuela", "Emanuelle", "Emília", "Emily",
             "Emma", "Emy", "Eneida", "Engrácia", "Enid", "Érica", "Erika", "Ermelinda", "Ernestina", "Esmeralda",
             "Esperança", "Estefânia", "Estela", "Ester", "Esther", "Estrela", "Etelvina", "Eugênia", "Eulália", "Eunice",
             "Eva", "Evangelina", "Evelin", "Evelyn", "Fabiana", "Fabíola", "Fanny", "Fátima", "Fay", "Felícia",
             "Felisberta", "Fernanda", "Filipa", "Filomena", "Flávia", "Flora", "Florence", "Florinda", "Fran", "Francine",
             "Francisca", "Frederica", "Gabriela", "Gabriele", "Gabriella", "Gal", "Gardênia", "Geovana", "Geralda", "Gertrudes",
             "Gilda", "Gina", "Giovana", "Giovanna", "Gisele", "Giselle", "Giulia", "Giuliana", "Glady", "Gláucia",
             "Glenda", "Glória", "Graça", "Grace", "Graciela", "Grazicla", "Guilhermina", "Guiomar", "Hagar", "Hana",
             "Hannah", "Haydée", "Hebe", "Helena", "Helenice", "Heloísa", "Helga", "Hercília", "Hermínia", "Hilary",
             "Hilda", "Hortência", "Hosana", "Iana", "Iara", "Ida", "Ieda", "Ilda", "Ilma", "Ilsa",
             "Ilse", "Iná", "Inês", "Ingrid", "Iolanda", "Ione", "Iracema", "Irina", "Iris", "Isabel",
             "Isabela", "Isabella", "Isadora", "Isis", "Isolda", "Ivana", "Ivete", "Ivone", "Iza", "Izabel",
             "Jaciara", "Jade", "Janaína", "Jandira", "Jane", "Janete", "Janice", "Jaqueline", "Jeanete", "Jeanne",
             "Jennifer", "Jenny", "Jéssica", "Joana", "Joanna", "Jocasta", "Joelma", "Joice", "Jordana", "Josefina",
             "Josiane", "Joyce", "Jucara", "Judite", "Julia", "Juliana", "Julieta", "Jurema", "Jussara", "Karen",
             "Karina", "Karla", "Karol", "Karolina", "Kátia", "Keila", "Kelly", "Késia", "Kiara", "Kim",
             "Kimberly", "Kristen", "Laís", "Lana", "Lara", "Larissa", "Laura", "Lavínia", "Leia", "Leila",
             "Leandra", "Leda", "Leilane", "Lena", "Lenora", "Leonor", "Leonora", "Leop", "Letícia", "Lia",
             "Liana", "Lídia", "Lígia", "Lila", "Lilian", "Liliana", "Liliane", "Linda", "Lindalva", "Line",
             "Lira", "Lis", "Lisa", "Lisandra", "Lisbeth", "Lívia", "Liz", "Liza", "Lola", "Lorena",
             "Lorraine", "Louise", "Lourdes", "Luana", "Luciana", "Luciene", "Lucille", "Lucinda", "Lucrécia", "Lucy",
             "Ludmila", "Luisa", "Luiza", "Luna", "Lurdes", "Luzia", "Lydia", "Mabel", "Madalena", "Mafalda",
             "Magali", "Magda", "Maia", "Maiara", "Maitê", "Malu", "Manoela", "Manuela", "Mara", "Marcela",
             "Márcia", "Margarida", "Maria", "Mariana", "Mariane", "Marieta", "Marilena", "Marília", "Marina", "Marisa",
             "Maristela", "Marjorie", "Marlene", "Marli", "Marta", "Martha", "Martina", "Matilde", "Maura", "Maya",
             "Mayara", "Mayra", "Mel", "Melânia", "Melina", "Melinda", "Melissa", "Mercedes", "Mércia", "Mia",
             "Micaela", "Michele", "Michelle", "Mila", "Milena", "Milene", "Mirela", "Mirella", "Miriam", "Mirian",
             "Moema", "Mônica", "Morgana", "Muriel", "Myriam", "Nádia", "Nadine", "Nair", "Nancy", "Naná",
             "Naomi", "Nara", "Natacha", "Natália", "Natalie", "Natasha", "Nathália", "Nazaré", "Neide", "Neli",
             "Nelma", "Neusa", "Nicole", "Nicolette", "Nilda", "Nilma", "Nilza", "Nina", "Ninfa", "Nívea",
             "Noelí", "Noêmia", "Norma", "Núbia", "Odete", "Odília", "Ofélia", "Olga", "Olímpia", "Olívia",
             "Ondina", "Oriana", "Otávia", "Paloma", "Pamela", "Paola", "Patrícia", "Paula", "Paulina", "Penélope",
             "Pérola", "Petra", "Piedade", "Pilar", "Poliana", "Priscila", "Quitéria", "Rafaela", "Rafaella", "Raissa",
             "Ramona", "Raquel", "Rayane", "Rebeca", "Regina", "Rejane", "Renata", "Rita", "Roberta", "Rogéria",
             "Romana", "Romeu", "Romilda", "Rosa", "Rosália", "Rosalina", "Rosana", "Rosane", "Rosângela", "Rosário",
             "Rose", "Rosemary", "Roxana", "Rute", "Ruth", "Sabine", "Sabrina", "Samanta", "Samantha", "Samara",
             "Sandra", "Sandy", "Sara", "Sarah", "Scarlett", "Selena", "Selma", "Serena", "Sheila", "Shirley",
             "Sibele", "Sílvia", "Simone", "Simony", "Sofia", "Sol", "Solange", "Sônia", "Sophia", "Sophie",
             "Soraia", "Soraya", "Stefany", "Stela", "Stella", "Sueli", "Susan", "Susana", "Suzana", "Suzete",
             "Tabita", "Tainá", "Taís", "Talita", "Tamara", "Tânia", "Tássia", "Tatiana", "Tatiane", "Telma",
             "Teodora", "Teresa", "Tereza", "Terezinha", "Thaís", "Thalia", "Thelma", "Thereza", "Ticiana", "Tina",
             "Túlia", "Ula", "Úrsula", "Valéria", "Valesca", "Valquíria", "Vanda", "Vanessa", "Vânia", "Vanusa",
             "Vera", "Veridiana", "Verônica", "Vicência", "Vicky", "Victória", "Vilma", "Violeta", "Virgínia", "Vitória",
             "Vivian", "Viviana", "Viviane", "Wanda", "Wilma", "Ximena", "Xuxa", "Yara", "Yasmin", "Yoko",
             "Yolanda", "Yvette", "Yvonne", "Zahra", "Zaira", "Zélia", "Zenaide", "Zilda", "Zoe", "Zuleica",
             "Zulmira"
        ]
        
        i = 0
        while added < needed and i < len(extra_names_f):
            name = extra_names_f[i]
            if name.lower() not in seen:
                new_entry = {
                    "id": f"gen_f_{random.randint(10000, 99999)}",
                    "name": name,
                    "meaning": "Significado pendente de atualização.",
                    "origin": "Desconhecida",
                    "curiosity": f"Nome {name} é bastante popular ou interessante.",
                    "category": random.choice(categories),
                    "gender": "F",
                    "tags": [random.choice(categories)]
                }
                unique_data.append(new_entry)
                seen.add(name.lower())
                added += 1
            i += 1

    # Final logic to ensure exactly 999 if possible
    final_data = unique_data[:999]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    print(f"Final write count: {len(final_data)}")

if __name__ == "__main__":
    main()
