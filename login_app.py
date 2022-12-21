# Import the necessary modules
import kivy
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button

# Disable multitouch
from kivy.config import Config
Config.set('input', 'mouse', 'mouse,multitouch_on_demand')

# Set the required version of Kivy
kivy.require('1.11.1')

# Apply the default Kivy theme
#kivy.themes.ThemeManager.set_default_theme('default')

# Create the login page layout
class LoginPage(BoxLayout):
  def __init__(self, **kwargs):
    super().__init__(**kwargs)

    # Set the layout orientation and padding
    self.orientation = 'vertical'
    self.padding = 50

    # Create the logo widget
    self.add_widget(Label(text='[b]My App[/b]', markup=True, font_size=30))

    # Create the username and password widgets
    self.username = TextInput(multiline=False, hint_text='Username')
    self.password = TextInput(multiline=False, password=True, hint_text='Password')

    # Add the username and password widgets to the layout
    self.add_widget(self.username)
    self.add_widget(self.password)

    # Create the login button widget
    self.login_button = Button(text='Log In', size_hint=(1, 0.2))
    self.add_widget(self.login_button)

# Create the app class
class MyApp(App):
  def build(self):
    return LoginPage()

# Run the app
if __name__ == '__main__':
  MyApp().run()