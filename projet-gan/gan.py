
import os
import zipfile
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

# Crée un dossier pour stocker les données
data_dir = "/content/lfw_dataset"
os.makedirs(data_dir, exist_ok=True)


zip_path = os.path.join(data_dir, "lfw-dataset.zip")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(data_dir)

images_dir = os.path.join(data_dir, "lfw-deepfunneled")
print(f"Chemin vers le dossier contenant les images : {images_dir}")
image_dir = "/content/lfw_dataset/lfw-deepfunneled/lfw-deepfunneled"

import numpy as np
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Fonction pour afficher des images
def show_sample_images(images_path, n_samples=10):
    image_files = []
    for person_dir in os.listdir(images_path):
        person_path = os.path.join(images_path, person_dir)
        if os.path.isdir(person_path):
            for img_file in os.listdir(person_path):
                img_path = os.path.join(person_path, img_file)
                if img_path.lower().endswith(('.png', '.jpg', '.jpeg')):
                    image_files.append(img_path)

    image_files = image_files[:n_samples]  # Limiter à n_samples images

    fig, axes = plt.subplots(1, len(image_files), figsize=(20, 5))
    for i, img_path in enumerate(image_files):
        img = Image.open(img_path)
        axes[i].imshow(img)
        axes[i].axis('off')
    plt.show()

# Afficher un échantillon d'images
show_sample_images(image_dir)

# Prétraitement des images
IMG_SIZE = 64

def preprocess_images(images_path, img_size=IMG_SIZE):
    images = []
    for person_dir in os.listdir(images_path):
        person_path = os.path.join(images_path, person_dir)
        if os.path.isdir(person_path):
            for img_file in os.listdir(person_path):
                img_path = os.path.join(person_path, img_file)
                try:  # Gérer les erreurs potentielles lors de l'ouverture d'une image
                    img = Image.open(img_path).convert("RGB")
                    img = img.resize((img_size, img_size))
                    img_array = np.array(img) / 127.5 - 1.0
                    images.append(img_array)
                except (IOError, ValueError) as e:
                    print(f"Erreur lors du traitement de l'image {img_path}: {e}")  # Afficher un message d'erreur
    return np.array(images)

# Chargement et prétraitement des images
all_images = preprocess_images(image_dir)
print(f"Nombre total d'images : {all_images.shape[0]}")
print(f"Dimensions des images : {all_images.shape[1:]}")

# Création des ensembles d'entraînement et de validation (80%-20%)
X_train, X_val = train_test_split(all_images, test_size=0.2, random_state=42)
print(f"Taille de l'ensemble d'entraînement : {X_train.shape[0]}")
print(f"Taille de l'ensemble de validation : {X_val.shape[0]}")

"""Construction du generateur"""

import tensorflow as tf
from tensorflow.keras import layers

def build_generator(latent_dim, img_shape):
    model = tf.keras.Sequential(name="Generator")

    # Étape 1 : Densité pleinement connectée
    model.add(layers.Dense(4 * 4 * 256, input_dim=latent_dim))
    model.add(layers.Reshape((4, 4, 256)))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())

    # Étape 2 : Convolution transposée (augmentation de la taille)
    model.add(layers.Conv2DTranspose(128, kernel_size=4, strides=2, padding="same"))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())

    # Étape 3 : Convolution transposée
    model.add(layers.Conv2DTranspose(64, kernel_size=4, strides=2, padding="same"))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())

     # Étape 4 : Convolution transposée (32x32x32)
    model.add(layers.Conv2DTranspose(32, kernel_size=4, strides=2, padding="same"))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())

    # Étape 4 : Dernière convolution transposée pour générer l'image
    model.add(layers.Conv2DTranspose(img_shape[2], kernel_size=4, strides=2, padding="same", activation="tanh"))

    return model

latent_dim = 100  # Dimension du vecteur bruit
img_shape = (64, 64, 3)  # Dimensions de l'image générée
generator = build_generator(latent_dim, img_shape)
generator.summary()

"""Construction du discriminateur"""

def build_discriminator(img_shape):
    model = tf.keras.Sequential(name="Discriminator")

    # Étape 1 : Convolution
    model.add(layers.Conv2D(64, kernel_size=4, strides=2, padding="same", input_shape=img_shape))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dropout(0.3))

    # Étape 2 : Convolution
    model.add(layers.Conv2D(128, kernel_size=4, strides=2, padding="same"))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dropout(0.3))

    # Étape 3 : Convolution
    model.add(layers.Conv2D(256, kernel_size=4, strides=2, padding="same"))
    model.add(layers.LeakyReLU(alpha=0.2))
    model.add(layers.Dropout(0.3))

    # Étape 4 : Classification
    model.add(layers.Flatten())
    model.add(layers.Dense(1, activation="sigmoid"))

    return model

discriminator = build_discriminator(img_shape)
discriminator.summary()

"""Compilation des modèles"""

# Compile le discriminateur
discriminator.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5),
                      loss="binary_crossentropy",
                      metrics=["accuracy"])

# Compile le générateur (pas encore entraîné directement)
generator_optimizer = tf.keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5)

"""Vérification de la structure"""

# Générer une image aléatoire avec le générateur
random_noise = tf.random.normal([1, latent_dim])  # Batch de bruit aléatoire
generated_image = generator(random_noise)
plt.imshow((generated_image[0] * 0.5 + 0.5).numpy())  # Convertir [-1,1] à [0,1]
plt.axis('off')
plt.show()

"""Construction du GAN"""

def build_gan(generator, discriminator):
    # Le discriminateur est "gelé" lors de l'entraînement du générateur
    discriminator.trainable = False

    model = tf.keras.Sequential(name="GAN")
    model.add(generator)
    model.add(discriminator)
    return model

# Construire le GAN
gan = build_gan(generator, discriminator)
gan.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5),
            loss="binary_crossentropy")
gan.summary()

"""Préparation des données"""

# Normalisation des données
X_train = (X_train * 2.0) - 1.0  # Convertir [0, 1] en [-1, 1]

# Création d'un dataset TensorFlow pour gérer les batchs
batch_size = 64
dataset = tf.data.Dataset.from_tensor_slices(X_train).shuffle(buffer_size=1024).batch(batch_size)

"""Boucle d'entraînement"""

import time

# Paramètres
epochs = 10000
latent_dim = 100
sample_interval = 1000  # Sauvegarder une image toutes les 1000 itérations

# Fonction d'entraînement
def train(generator, discriminator, gan, dataset, epochs, batch_size, latent_dim):
    start_time = time.time()

    # Boucle d'entraînement
    for epoch in range(epochs):
        for real_images in dataset:
            batch_size_actual = real_images.shape[0]

            # Étape 1 : Entraîner le discriminateur
            noise = tf.random.normal([batch_size_actual, latent_dim])
            fake_images = generator(noise)

            real_labels = tf.ones((batch_size_actual, 1)) * 0.9  # Label smoothing
            fake_labels = tf.zeros((batch_size_actual, 1))

            # Perte pour les vraies et les fausses images
            d_loss_real = discriminator.train_on_batch(real_images, real_labels)
            d_loss_fake = discriminator.train_on_batch(fake_images, fake_labels)
            d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)

            # Étape 2 : Entraîner le générateur
            noise = tf.random.normal([batch_size_actual, latent_dim])
            misleading_labels = tf.ones((batch_size_actual, 1))  # Le générateur essaie de tromper
            g_loss = gan.train_on_batch(noise, misleading_labels)

        # Afficher les pertes
        if (epoch + 1) % 100 == 0:
            print(f"Epoch {epoch + 1}/{epochs} | D Loss: {d_loss[0]:.4f}, Acc: {d_loss[1]:.4f} | G Loss: {g_loss:.4f}")

        # Sauvegarder des échantillons
        if (epoch + 1) % sample_interval == 0:
            generate_and_save_images(generator, epoch + 1, latent_dim)

    print(f"Entraînement terminé en {time.time() - start_time:.2f} secondes.")

# Fonction pour générer et sauvegarder des images
def generate_and_save_images(generator, epoch, latent_dim):
    noise = tf.random.normal([16, latent_dim])  # Générer 16 images
    generated_images = generator(noise)
    generated_images = (generated_images * 0.5) + 0.5  # Revenir à la plage [0, 1]

    # Afficher et sauvegarder les images
    fig, axes = plt.subplots(4, 4, figsize=(8, 8))
    for i, ax in enumerate(axes.flat):
        ax.imshow(generated_images[i])
        ax.axis('off')
    plt.tight_layout()
    plt.savefig(f"generated_images_epoch_{epoch}.png")
    plt.show()

# Lancer l'entraînement
train(generator, discriminator, gan, dataset, epochs, batch_size, latent_dim)

"""Sauvegarde des modèles"""

generator.save("generator.h5")
discriminator.save("discriminator.h5")